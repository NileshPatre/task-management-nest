import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity({ name: "status" })
export class Status {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  label: string;
}
