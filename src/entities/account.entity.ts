import { Entity, Column } from 'typeorm';

@Entity({ name: 'accounts' })
export class Accounts {
  @Column({ nullable: false, primary: true })
  account_number: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: true })
  credit_limit: number;
}
