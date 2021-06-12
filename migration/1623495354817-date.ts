import {MigrationInterface, QueryRunner} from "typeorm";

export class date1623495354817 implements MigrationInterface {
    name = 'date1623495354817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT '"2021-06-12T10:55:55.166Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createdAt"`);
    }

}
