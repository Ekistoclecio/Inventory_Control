import { PostgresDataSource } from "../database/app-data-source";
import { Product } from "../database/entities/Product.entity";

export const productRepository = PostgresDataSource.getRepository(Product);
