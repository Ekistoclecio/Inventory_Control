import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";

// Entidade que representa um produto no banco de dados.
@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: "User_id" })
  user: User;
}
