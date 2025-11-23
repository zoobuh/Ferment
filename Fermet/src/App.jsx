import Routing from "./Routing";
import ReactGA from "react-ga4";
import Loader from "./pages/Loader";
import lazyLoad from "./lazyWrapper";
import NotFound from "./pages/NotFound";
import { useEffect, useMemo, memo } from "react";
import { useLocation } from "react-router-dom";
import { OptionsProvider, useOptions } from "./utils/optionsContext";
import { designConfig as bgDesign } from "./utils/config";
import { initPreload } from "./utils/preload";
import "./index.css";
import "nprogress/nprogress.css";
import Background from "./components/Background";

const importHome = () => import("./pages/Home");
const importApps = () => import("./pages/Apps");
const importGames = () => import("./pages/Games");
const importSettings = () => import("./pages/Settings");

const Home = lazyLoad(importHome);
const Apps = lazyLoad(importApps);
const Games = lazyLoad(importGames);
const Settings = lazyLoad(importSettings);
const New = lazyLoad(() => import("./pages/New"));
const Player = lazyLoad(() => import("./pages/Player"));

initPreload("/apps", importApps);
initPreload("/games", importGames);
initPreload("/settings", importSettings);
initPreload("/", importHome);

function useTracking() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
}

const ThemedApp = memo(() => {
  const { options } = useOptions();
  useTracking();

  const pages = useMemo(() => [
    { path: "/", element: <Home /> },
    { path: "/apps", element: <Apps /> },
    { path: "/games", element: <Games /> },
    { path: "/games/r", element: <Player /> },
    { path: "/browser", element: <Loader /> },
    { path: "/settings", element: <Settings /> },
    { path: "/new", element: <New /> },
    { path: "*", element: <NotFound /> },
  ], []);

  const backgroundStyle = useMemo(() => {
    const bgDesignConfig = options.bgDesign === "None"
      ? "none"
      : (bgDesign.find(d => d.value.bgDesign === options.bgDesign) || bgDesign[0])
          .value.getCSS?.(options.bgDesignColor || "102, 105, 109") || "none";

    return `
      body {
        color: ${options.siteTextColor || "#e6e9ec"};
        background-image: ${bgDesignConfig};
        background-color: ${options.bgColor || "#1e1f22"};
      }
    `;
  }, [options.siteTextColor, options.bgDesign, options.bgDesignColor, options.bgColor]);

  return (
    <>
      <Background />
      <Routing pages={pages} />
      <style>{backgroundStyle}</style>
    </>
  );
});

ThemedApp.displayName = 'ThemedApp';

const App = () => (
  <OptionsProvider>
    <ThemedApp />
  </OptionsProvider>
);

export default App;
