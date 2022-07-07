import { serve } from "bun"
import controllers from "~/controllers";
import { createRouter } from "~/server/router"

const router = createRouter();

router.get("/", controllers.home.index);
router.get("/posts", controllers.posts.index);
router.post("/posts", controllers.posts.create);
router.get(/^\/posts\/(?<id>\d+)$/, controllers.posts.show);
router.patch(/^\/posts\/(?<id>\d+)$/, controllers.posts.update);
router.delete(/^\/posts\/(?<id>\d+)$/, controllers.posts.destroy);

const handleRequest = async (request: Request) => {
  const url = new URL(request.url)
  const path = url.pathname;
  const method = request.method;

  console.log(`Request [${method}]: ${path}`);

  const route = router.resolve(method, path);

  const data = await request.text();

  const dataParams = Object.fromEntries(new URLSearchParams(data));

  if (route) {
    try {
      const params = { ...dataParams, ...route.params };

      return route.controller({ request, params });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Response(error.message, { status: 400 });
      }
    }
  }

  return new Response("BUN BUN", { status: 404 })
}

const server = serve({
  async fetch(request: Request) {
    return await handleRequest(request);
  },
})

console.info(`Sever running on port ${server.port}`)
