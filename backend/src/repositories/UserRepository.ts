import { PostgresDataSource } from "../database/app-data-source";
import { User } from "../database/entities/User.entity";

export const userRepository = PostgresDataSource.getRepository(User);
