import { Database } from "bun:sqlite";

declare global {
  var db: Database;
}

export const db: Database = globalThis.db || (globalThis.db = new Database(process.env.DB_FILE || "db.sqlite"));

db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);
