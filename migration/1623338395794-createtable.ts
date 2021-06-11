import { MigrationInterface, QueryRunner } from 'typeorm';

export class createtable1623338395794 implements MigrationInterface {
  name = 'createtable1623338395794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('=================>>>>>table created');

    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" integer NOT NULL DEFAULT '20', "title" character varying NOT NULL, "description" character varying NOT NULL, "ingredients" character varying array NOT NULL, "category" character varying NOT NULL, "reason" character varying NOT NULL, "image" character varying NOT NULL, "recommended" boolean NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
