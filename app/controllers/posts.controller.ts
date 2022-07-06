import type { Controller } from "~/types/controller";
import post from "~/models/post.model";
import { json } from "~/server/response";

const index: Controller = () => {
  try {
    const all = post.all();

    return json
    (all);
  } catch (error) {
    console.error(error);

    return json([]);
  }
};

const create: Controller = ({ params }) => {
  const content = params.get("content");

  if (!content) {
    throw new Error("Param 'content' is missing");
  }

  try {
    const item = post.create(content);

    return json(item);
  } catch (error) {
    console.error(error);

    throw new Error("Post 'create' failed");
  }
};

const show: Controller = ({ params }) => {
  const id = Number(params.get("id"));

  const item = post.get(id);

  if (!item) {
    return json(
      {
        message: "Not found",
      },
      404
    );
  }

  return json(item);
};

const update: Controller = ({ params }) => {
  const id = Number(params.get("id"));
  const content = params.get("content");

  if (!content) {
    throw new Error("Param 'content' is missing");
  }

  const item = post.update(id, content);

  return json(item);
};

const destroy: Controller = ({ params }) => {
  const id = Number(params.get("id"));

  const res = post.destroy(id);

  if (!res) {
    throw new Error("Bad request");
  }

  return json({});
};

export default {
  index,
  create,
  show,
  update,
  destroy,
};
