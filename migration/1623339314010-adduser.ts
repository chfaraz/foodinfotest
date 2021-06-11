import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class adduser1623339314010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = 'admin';
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    await queryRunner.query(`INSERT INTO public."user"
        (id, "password", "userName")
        VALUES(uuid_generate_v4(), '${hash}', 'admin');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
