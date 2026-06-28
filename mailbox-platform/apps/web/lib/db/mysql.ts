import mysql from "mysql2/promise";
import { env } from "@/lib/config/env";

let pool: mysql.Pool | undefined;
type SqlValue = string | number | boolean | null | Date | Buffer;

export const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: env.database.host(),
      port: env.database.port(),
      database: env.database.name(),
      user: env.database.user(),
      password: env.database.password(),
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60_000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      charset: "utf8mb4",
    });
  }

  return pool;
};

export const query = async <T>(sql: string, values: SqlValue[] = []) => {
  const [rows] = await getPool().execute(sql, values);
  return rows as T;
};
