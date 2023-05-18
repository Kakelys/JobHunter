-- DropForeignKey
ALTER TABLE "vacancy" DROP CONSTRAINT "vacancy_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "employer"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION;
