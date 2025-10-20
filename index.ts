import { file } from "bun"
import path from "path"

const server = Bun.serve({
  port: 3333,
  fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname === '/' ? 'index.html' : url.pathname;
    const filePath = path.join(import.meta.dir, pathname);

    try {
      return new Response(file(filePath));
    } catch (error) {
      console.error(error);
      return new Response('File not found', { status: 404 });
    }
  }
});

console.log(`Listening on http://localhost:${server.port} ...`);
