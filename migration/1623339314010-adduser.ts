import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'utils/admin';

export class adduser1623339314010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await hash();
    console.log('HASHED PASSWORD', hashedPassword);
    await queryRunner.query(`INSERT INTO public."user"
        (id, "password", "userName")
        VALUES(uuid_generate_v4(), '${hashedPassword}', '${process.env.USER_NAME}');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
