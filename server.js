'use strict';
/**
 * Static file server for the ObjectiveDone build portal.
 *
 * ZERO DEPENDENCIES, ON PURPOSE. Hostinger runs `npm install` before `npm start`;
 * with an empty dependency list that step cannot fail on a network hiccup, a
 * registry outage or a native build, and there is no node_modules to deploy. The
 * portal is plain HTML/CSS/JS — it needs a file server, not a framework.
 *
 * PORT COMES FROM THE ENVIRONMENT. Hostinger assigns the port and expects the app
 * to bind it; hard-coding one is the single most common reason a Node app deploys
 * "successfully" and then answers nothing.
 */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

function send(res, status, body, headers) {
  res.writeHead(status, Object.assign({ 'X-Content-Type-Options': 'nosniff' }, headers));
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method Not Allowed', { 'Content-Type': 'text/plain' });
  }

  let pathname;
  try {
    pathname = decodeURIComponent(url.parse(req.url).pathname || '/');
  } catch {
    return send(res, 400, 'Bad Request', { 'Content-Type': 'text/plain' });
  }

  // Resolve, then verify the result is still inside ROOT. Checking the raw path
  // for ".." is not enough — encodings and symlinks get around it; comparing the
  // RESOLVED path is what actually holds.
  let filePath = path.join(ROOT, pathname);
  if (pathname.endsWith('/')) filePath = path.join(filePath, 'index.html');
  const resolved = path.resolve(filePath);
  if (resolved !== ROOT && !resolved.startsWith(ROOT + path.sep)) {
    return send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain' });
  }

  fs.stat(resolved, (err, stat) => {
    // A directory reached without a trailing slash: serve its index.
    if (!err && stat.isDirectory()) {
      return serveFile(path.join(resolved, 'index.html'), res, req);
    }
    if (err) {
      // Allow extension-less URLs (/modules/scan → /modules/scan.html).
      if (!path.extname(resolved)) {
        return fs.stat(resolved + '.html', e2 =>
          e2 ? notFound(res, req) : serveFile(resolved + '.html', res, req),
        );
      }
      return notFound(res, req);
    }
    serveFile(resolved, res, req);
  });
});

function serveFile(file, res, req) {
  fs.readFile(file, (err, buf) => {
    if (err) return notFound(res, req);
    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
    // data.js and the HTML change every time the status is regenerated, so they
    // must not be cached hard. Fingerprint-free assets get a short cache too —
    // this is an internal portal, not a high-traffic site, and stale numbers in
    // front of a client are worse than an extra request.
    const cache = /\.(png|jpe?g|webp|svg|woff2?|ttf|ico)$/i.test(file)
      ? 'public, max-age=86400'
      : 'no-cache';
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': cache,
      'X-Content-Type-Options': 'nosniff',
    });
    if (req.method === 'HEAD') return res.end();
    res.end(buf);
  });
}

function notFound(res, req) {
  const file = path.join(ROOT, '404.html');
  fs.readFile(file, (err, buf) => {
    if (err) return send(res, 404, 'Not found', { 'Content-Type': 'text/plain; charset=utf-8' });
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    if (req.method === 'HEAD') return res.end();
    res.end(buf);
  });
}

server.listen(PORT, HOST, () => {
  console.log(`ObjectiveDone build portal listening on http://${HOST}:${PORT}`);
});
