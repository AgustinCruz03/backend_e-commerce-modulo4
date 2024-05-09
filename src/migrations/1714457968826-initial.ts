import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1714457968826 implements MigrationInterface {
    name = 'Initial1714457968826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" integer NOT NULL, "country" character varying(50) NOT NULL, "address" character varying NOT NULL, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/6/64/Ejemplo.png', "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ordersDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "orderId" uuid, CONSTRAINT "REL_b6a1554f2d80e48ffa60dd6a0c" UNIQUE ("orderId"), CONSTRAINT "PK_d1fff5666a3601a3a7a786a3cd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_order_details_orders_details" ("productsId" uuid NOT NULL, "ordersDetailsId" uuid NOT NULL, CONSTRAINT "PK_e99100da90ce16023a94915e693" PRIMARY KEY ("productsId", "ordersDetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24020d78581c03248da99c5fca" ON "products_order_details_orders_details" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_771d7c5a3cee9e60d8e7146d96" ON "products_order_details_orders_details" ("ordersDetailsId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordersDetails" ADD CONSTRAINT "FK_b6a1554f2d80e48ffa60dd6a0c3" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_details" ADD CONSTRAINT "FK_24020d78581c03248da99c5fcaf" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_details" ADD CONSTRAINT "FK_771d7c5a3cee9e60d8e7146d965" FOREIGN KEY ("ordersDetailsId") REFERENCES "ordersDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_details" DROP CONSTRAINT "FK_771d7c5a3cee9e60d8e7146d965"`);
        await queryRunner.query(`ALTER TABLE "products_order_details_orders_details" DROP CONSTRAINT "FK_24020d78581c03248da99c5fcaf"`);
        await queryRunner.query(`ALTER TABLE "ordersDetails" DROP CONSTRAINT "FK_b6a1554f2d80e48ffa60dd6a0c3"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_771d7c5a3cee9e60d8e7146d96"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24020d78581c03248da99c5fca"`);
        await queryRunner.query(`DROP TABLE "products_order_details_orders_details"`);
        await queryRunner.query(`DROP TABLE "ordersDetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
