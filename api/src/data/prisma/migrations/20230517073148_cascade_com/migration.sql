-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
