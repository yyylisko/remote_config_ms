import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateConfig1694341640005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE config (id int, name varchar(500),value text);`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE config;`
        )
    }

}
