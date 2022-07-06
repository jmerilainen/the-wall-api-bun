import { json } from "~/server/response";
import type { Controller } from "~/types/controller";

const index: Controller = () => {
  return json({
    message: "Hello World!",
  });
};

const create: Controller = ({ params }) => {
  return json({
    message: "OK",
  });
};


export default {
  index,
  create,
};
