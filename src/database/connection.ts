import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../users/domain/entities/userEntity";

dotenv.config();

export const AppDataSource = new DataSource({
  type:"mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });