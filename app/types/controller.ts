import type { RouteProps } from "./router";

export type Controller = ({
  request,
  params
}: RouteProps) => Response | Promise<Response>
