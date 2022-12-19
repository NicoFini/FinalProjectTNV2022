import { Sequelize } from "sequelize";

const db = new Sequelize({
  database: "db_gtm",
  username: "root",
  password: "MySQL6610639!",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default db;
