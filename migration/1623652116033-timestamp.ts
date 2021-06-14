import {MigrationInterface, QueryRunner} from "typeorm";

export class timestamp1623652116033 implements MigrationInterface {
    name = 'timestamp1623652116033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "createdAt" SET DEFAULT '2021-06-12 10:55:55.166'`);
    }

}
