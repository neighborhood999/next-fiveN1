const Koa = require('koa');
const router = require('koa-route');
const next = require('next');
const LRUCache = require('lru-cache');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 * 24 * 30 // 1Month
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(ctx) {
  return ctx.url;
}

function renderAndCache(ctx, pagePath, queryParams) {
  const key = getCacheKey(ctx.req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    ctx.body = ssrCache.get(key);

    return Promise.resolve();
  }

  // If not let's render the page into HTML
  return app
    .renderToHTML(ctx.req, ctx.res, pagePath, queryParams)
    .then(html => {
      // Let's cache this page
      ssrCache.set(key, html);
      ctx.body = html;
    })
    .catch(err => {
      return app.renderError(err, ctx.req, ctx.res, pagePath, queryParams);
    });
}

app.prepare().then(() => {
  const server = new Koa();

  server.use(router.get('/', ctx => renderAndCache(ctx, '/')));
  server.use(router.get('/about', ctx => renderAndCache(ctx, '/about')));

  server.use(async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`🌏  => Ready on http://localhost:${port}`);
  });
});
