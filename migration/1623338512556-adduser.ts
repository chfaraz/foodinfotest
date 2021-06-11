import { MigrationInterface, QueryRunner } from 'typeorm';

export class adduser1623338512556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('=================>>>>> User Added <<<<<================');

    await queryRunner.query(`INSERT INTO public."user"
      (id, "password", "userName")
      VALUES(uuid_generate_v4(), 'Faraz123', 'faraz');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
