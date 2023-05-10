-- DropForeignKey
ALTER TABLE "account_info" DROP CONSTRAINT "account_info_id_fkey";

-- DropForeignKey
ALTER TABLE "employer" DROP CONSTRAINT "employer_account_id_fkey";

-- DropForeignKey
ALTER TABLE "employer" DROP CONSTRAINT "employer_company_id_fkey";

-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_account_id_fkey";

-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_vacancy_id_fkey";

-- DropForeignKey
ALTER TABLE "invite" DROP CONSTRAINT "invite_account_id_fkey";

-- DropForeignKey
ALTER TABLE "invite" DROP CONSTRAINT "invite_company_id_fkey";

-- DropForeignKey
ALTER TABLE "invite" DROP CONSTRAINT "invite_inviter_id_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_from_id_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_to_id_fkey";

-- DropForeignKey
ALTER TABLE "reply" DROP CONSTRAINT "reply_account_id_fkey";

-- DropForeignKey
ALTER TABLE "reply" DROP CONSTRAINT "reply_vacancy_id_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_account_id_fkey";

-- DropForeignKey
ALTER TABLE "vacancy" DROP CONSTRAINT "vacancy_company_id_fkey";

-- DropForeignKey
ALTER TABLE "vacancy" DROP CONSTRAINT "vacancy_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "account_info" ADD CONSTRAINT "account_info_id_fkey" FOREIGN KEY ("id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employer" ADD CONSTRAINT "employer_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employer" ADD CONSTRAINT "employer_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_vacancy_id_fkey" FOREIGN KEY ("vacancy_id") REFERENCES "vacancy"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_vacancy_id_fkey" FOREIGN KEY ("vacancy_id") REFERENCES "vacancy"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vacancy" ADD CONSTRAINT "vacancy_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "employer"("account_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invite" ADD CONSTRAINT "invite_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invite" ADD CONSTRAINT "invite_inviter_id_fkey" FOREIGN KEY ("inviter_id") REFERENCES "employer"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invite" ADD CONSTRAINT "invite_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
