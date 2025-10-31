import dotenv from "dotenv";
import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { logging, server as wisp } from "@mercuryworkshop/wisp-js/server";
import { createBareServer } from "@tomphttp/bare-server-node";
import { MasqrMiddleware } from "./masqr.js";

dotenv.config();

const port = process.env.PORT || 2345;

// Bare server for /seal/
const bare = process.env.BARE !== "false" ? createBareServer("/seal/") : null;

// Silence logging
logging.set_level(logging.NONE);

// Wisp options
Object.assign(wisp.options, {
  dns_method: "resolve",
  dns_servers: ["1.1.1.3", "1.0.0.3"],
  dns_result_order: "ipv4first"
});

const app = Fastify({
  logger: false,
  keepAliveTimeout: 30000,
  connectionTimeout: 60000,
  forceCloseConnections: true
});

// Cookies
await app.register(fastifyCookie);

// CORS for Vercel frontend
await app.register(fastifyCors, {
  origin: ["https://fermet-six.vercel.app", "https://fermet.gegamo.xyz"],// replace with your frontend URL
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
  credentials: true
});

// Masqr middleware
if (process.env.MASQR === "true") {
  app.addHook("onRequest", MasqrMiddleware);
}

// Proxy helper
const proxy = (url, type = "application/javascript") => async (req, reply) => {
  try {
    const res = await fetch(url(req));
    if (!res.ok) return reply.code(res.status).send();

    const hop = [
      "connection",
      "keep-alive",
      "proxy-authenticate",
      "proxy-authorization",
      "te",
      "trailer",
      "transfer-encoding",
      "upgrade",
      "content-encoding"
    ];
    for (const [k, v] of res.headers) {
      if (!hop.includes(k.toLowerCase())) reply.header(k, v);
    }

    if (res.headers.getSetCookie) {
      const cookies = res.headers.getSetCookie();
      if (cookies.length) reply.header("set-cookie", cookies);
    }

    if (!res.headers.get("content-type")) reply.type(type);

    return reply.send(res.body);
  } catch {
    return reply.code(500).send();
  }
};

// Routes
app.get("/assets/*", proxy(req => `https://dogeub-assets.pages.dev/${req.params["*"]}`, ""));
app.get("/assets-fb/*", proxy(req => `https://dogeub-assets.ftp.sh/${req.params["*"]}`, ""));
app.get("/js/script.js", proxy(() => "https://byod.privatedns.org/js/script.js"));
app.get("/ds", (req, res) => res.redirect("https://discord.gg/ZBef7HnAeg"));
app.get("/return", async (req, reply) =>
  req.query?.q
    ? fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(req.query.q)}`)
        .then(r => r.json())
        .catch(() => reply.code(500).send({ error: "request failed" }))
    : reply.code(401).send({ error: "query parameter?" })
);
// Heartbeat route
app.get("/heartbeat", async (req, reply) => {
  return reply.send({ status: "ok", timestamp: new Date().toISOString() });
});


// 404 handler
app.setNotFoundHandler((req, reply) =>
  reply.code(404).send({ error: "Not Found" })
);

// WebSocket upgrade for /wisp/ and /seal/
app.server.on("upgrade", (req, socket, head) => {
  if (bare?.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else if (req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

// Start server
app.listen({ port, host: "0.0.0.0" }).then(() => console.log(`Backend running on port ${port}`));
