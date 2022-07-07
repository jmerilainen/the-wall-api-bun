import type { Controller } from "./controller";

export interface RouteProps {
  request: Request;
  params: {[key: string]: string};
}

export interface Route {
  method: string;
  id: string;
  matcher: RegExp;
  controller: Controller;
}

type Path = string | RegExp;

export type AddRoute = (path: Path, controller: Route["controller"]) => void;

export type RegisterRoute = (
  method: Route["method"],
  path: Path,
  controller: Route["controller"]
) => void;
