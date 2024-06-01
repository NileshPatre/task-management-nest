import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Status } from "./status";
@Entity({ name: "tasks" })
export class Tasks {
  @PrimaryColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ name: "created_at" })
  createdAt: string;
  @Column({ name: "updated_at" })
  updatedAt: string;
  @OneToOne(() => Status)
  @JoinColumn({ name: "status_id" })
  status: Status;
}
