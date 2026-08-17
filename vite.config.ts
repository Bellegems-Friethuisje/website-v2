import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import vike from "vike/plugin";
import { defineConfig, type Plugin } from "vite";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://www.bellegemsfriethuisje.be";

const routes = [
  { path: "/",            changefreq: "weekly",  priority: "1.0" },
  { path: "/menu",        changefreq: "weekly",  priority: "0.9" },
  { path: "/locaties",    changefreq: "monthly", priority: "0.8" },
  { path: "/reservaties", changefreq: "monthly", priority: "0.7" },
];

function sitemapPlugin(): Plugin {
  let isClientBuild = false;
  let outDir = "dist/client";

  return {
    name: "generate-sitemap",
    apply: "build",
    configResolved(config) {
      isClientBuild = !config.build.ssr;
      outDir = config.build.outDir;
    },
    closeBundle() {
      if (!isClientBuild) return;

      const lastmod = new Date().toISOString().split("T")[0];

      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...routes.map((r) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${r.path}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            `    <changefreq>${r.changefreq}</changefreq>`,
            `    <priority>${r.priority}</priority>`,
            "  </url>",
          ].join("\n")
        ),
        "</urlset>",
      ].join("\n");

      mkdirSync(outDir, { recursive: true });
      writeFileSync(resolve(outDir, "sitemap.xml"), xml, "utf-8");
      console.log("\x1b[32m✓\x1b[0m sitemap.xml →", resolve(outDir, "sitemap.xml"));
    },
  };
}

function devApiPlugin(): Plugin {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      function parseBody(req: any): Promise<void> {
        return new Promise((resolve) => {
          let data = ''
          req.on('data', (chunk: any) => (data += chunk))
          req.on('end', () => {
            try { req.body = data ? JSON.parse(data) : {} } catch { req.body = {} }
            resolve()
          })
        })
      }

      function wrapRes(res: any) {
        res.status = function (code: number) { this.statusCode = code; return this }
        res.json = function (data: any) {
          this.setHeader('Content-Type', 'application/json')
          this.end(JSON.stringify(data))
        }
        return res
      }

      server.middlewares.use('/api/admin-auth', async (req: any, res: any) => {
        await parseBody(req)
        const { default: handler } = await server.ssrLoadModule('/api/admin-auth.js')
        await handler(req, wrapRes(res))
      })

      server.middlewares.use('/api/menu-prices', async (req: any, res: any) => {
        await parseBody(req)
        const { default: handler } = await server.ssrLoadModule('/api/menu-prices.js')
        await handler(req, wrapRes(res))
      })

      server.middlewares.use('/api/upload-image', async (req: any, res: any) => {
        await parseBody(req)
        const { default: handler } = await server.ssrLoadModule('/api/upload-image.js')
        await handler(req, wrapRes(res))
      })

      server.middlewares.use('/api/preorder', async (req: any, res: any) => {
        await parseBody(req)
        const { default: handler } = await server.ssrLoadModule('/api/preorder.js')
        await handler(req, wrapRes(res))
      })
    },
  }
}

export default defineConfig({
  plugins: [vike(), tailwindcss(), vue(), sitemapPlugin(), devApiPlugin()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
