import { db } from "~/db";
import { sanitzeInput } from "~/utils";

const TABLE = "posts";

interface Post {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

const format = (raw: Post) => {
  return {
    ...raw,
    content: sanitzeInput(raw.content),
  };
};

const all = () => {
  return db
    .query(`SELECT * FROM ${TABLE} ORDER BY id ASC LIMIT 100`).all();
};

const get = (id: number) => {
  return db
    .query(`SELECT * FROM ${TABLE} WHERE id = $id`).get({
      $id: id,
    });
};

const create = (content: string) => {
  return db
    .exec(`INSERT INTO ${TABLE} (content) VALUES ($content)`,{
      $content: content,
    });
};

const update = (id: number, content: string) => {
  return db
    .exec(`UPDATE ${TABLE} SET content = $content, updated_at = CURRENT_TIMESTAMP WHERE id = $id`, {
      $content: content,
      $id: id,
    });
};

const destroy = async (id: number) => {
  return db.exec(`DELETE FROM ${TABLE} WHERE id = $id`, {
    $id: id,
  });
};

export default {
  create,
  all,
  get,
  update,
  destroy,
};
