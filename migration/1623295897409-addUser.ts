import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class addUser1623295897409 implements MigrationInterface {
  name = 'addUser1623295897409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const saltRounds = 10;
    const userName = 'admin';
    const password = 'admin';
    const hash: string = await bcrypt.hash(password, saltRounds);
    await queryRunner.query(
      `INSERT INTO public.user ('userName', 'password') VALUES (${userName},${hash});`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(``);
  }
}
