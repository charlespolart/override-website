import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(__dirname, 'dist');
const PORT = 3010;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

async function tryFile(filePath) {
  try {
    const data = await readFile(filePath);
    const ext = extname(filePath);
    return { data, mime: MIME_TYPES[ext] || 'application/octet-stream' };
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  // Try exact file, then index.html in directory, then 404
  const result =
    (await tryFile(join(DIST, pathname))) ||
    (await tryFile(join(DIST, pathname, 'index.html'))) ||
    (await tryFile(join(DIST, '404.html')));

  if (result && result !== (await tryFile(join(DIST, '404.html')))) {
    res.writeHead(200, { 'Content-Type': result.mime });
    res.end(result.data);
  } else if (result) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(result.data);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
