import apps from '/src/data/apps.json';

// Filter games that have valid URLs
const gFilters = (apps.games || [])
  .filter(game => /^https?:\/\//.test(game.url))
  .map(game => ({
    url: new URL(game.url).hostname.replace(/^www\./, ''),
    type: 'scr',
  }));

// Backend URL (Render)
const backend = "https://fermet.onrender.com";

export const CONFIG = {
  // Backend endpoints
  bUrl: `${backend}/seal/`, // Proxy endpoint
  ws: `${backend.replace(/^http/, 'ws')}/wisp/`, // WebSocket endpoint

  // Local frontend scripts
  transport: '/libcurl/index.mjs',
  baremod: '/baremod/index.mjs',

  unsupported: [],

  // Filters for blocked sites
  filter: [
    { url: 'neal.fun', type: 'scr' },
    { url: 'geforcenow.com', type: 'scr' },
    { url: 'spotify.com', type: 'scr' },
    ...gFilters,
  ],
};
