import type { AddRoute, RegisterRoute, Route } from "~/types/router";

const createRouter = () => {
  const routes: Route[] = [];

  const register: RegisterRoute = (method, path, controller) => {
    const id = path.toString();

    // Make string paths to match excat
    const matcher =
      typeof path === "string" ? new RegExp("^" + path + "$") : path;

    routes.push({
      method,
      id,
      matcher,
      controller,
    });
  };

  const get: AddRoute = (path, controller) => register("get", path, controller);

  const post: AddRoute = (path, controller) =>
    register("post", path, controller);

  const put: AddRoute = (path, controller) => register("put", path, controller);

  const patch: AddRoute = (path, controller) =>
    register("patch", path, controller);

  const destroy: AddRoute = (path, controller) =>
    register("delete", path, controller);

  const resolve = (method: string, url: string) => {
    const route = routes.find((route) => {
      return route.method === method.toLowerCase() && url.match(route.matcher);
    });
    if (! route) {
      return undefined;
    }

    const match = url.match(route.matcher);
    const params = match?.groups || {};

    return {
      ...route,
      params,
    }
  };

  return {
    register,
    get,
    post,
    put,
    patch,
    delete: destroy,
    resolve,
  };
};

export { createRouter };
