import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Product } from "../entities/Product.entity";
import { UserSeed } from "./userSeed";
import { ProductSeed } from "./productSeed";

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await runSeeder(dataSource, UserSeed);
    await runSeeder(dataSource, ProductSeed);
  }
}
