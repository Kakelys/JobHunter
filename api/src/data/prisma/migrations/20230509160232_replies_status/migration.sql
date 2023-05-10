/*
  Warnings:

  - You are about to drop the column `reply_status` on the `reply` table. All the data in the column will be lost.
  - Added the required column `status` to the `reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reply" DROP COLUMN "reply_status",
ADD COLUMN     "status" "reply_status" NOT NULL;
