import Routing from "./Routing";
import ReactGA from "react-ga4";
import Loader from "./pages/Loader";
import lazyLoad from "./lazyWrapper";
import NotFound from "./pages/NotFound";
import { useEffect, useMemo, memo } from "react";
import { useLocation } from "react-router-dom";
import { OptionsProvider, useOptions } from "./utils/optionsContext";
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

initPreload("/support", importApps);
initPreload("/documentation", importGames);
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
    { path: "/support", element: <Apps /> },
    { path: "/documentation", element: <Games /> },
    { path: "/documentation/r", element: <Player /> },
    { path: "/browser", element: <Loader /> },
    { path: "/settings", element: <Settings /> },
    { path: "/new", element: <New /> },
    { path: "*", element: <NotFound /> },
  ], []);

  const backgroundStyle = useMemo(() => {
    return `
      body {
        color: ${options.siteTextColor || "#e6faff"};
        background-image: none;
        background-color: ${options.bgColor || "#000000"};
      }
    `;
  }, [options.siteTextColor, options.bgColor]);

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
