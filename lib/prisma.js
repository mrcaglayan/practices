import { PrismaClient } from "@prisma/client";
import { PrismaMySQL } from "@prisma/adapter-mysql";
import mysql from "mysql2/promise";

const globalForPrisma = globalThis;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const pool =
  globalForPrisma.mysqlPool ?? mysql.createPool(connectionString);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.mysqlPool = pool;
}

const adapter =
  globalForPrisma.prismaAdapter ?? new PrismaMySQL(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaAdapter = adapter;
}
