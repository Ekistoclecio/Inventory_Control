import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import bcrypt from "bcrypt";

export class UserSeed implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    const user = {
      name: "User",
      lastName: "Example",
      email: "user@example.com",
      password: await bcrypt.hash("example123", 10),
    };

    const newUser = await repository.create(user);
    await repository.save(newUser);
  }
}
