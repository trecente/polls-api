-- DropForeignKey
ALTER TABLE "poll_options" DROP CONSTRAINT "poll_options_pollId_fkey";

-- DropForeignKey
ALTER TABLE "vote" DROP CONSTRAINT "vote_pollId_fkey";

-- DropForeignKey
ALTER TABLE "vote" DROP CONSTRAINT "vote_pollOptionsId_fkey";

-- AddForeignKey
ALTER TABLE "poll_options" ADD CONSTRAINT "poll_options_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_pollOptionsId_fkey" FOREIGN KEY ("pollOptionsId") REFERENCES "poll_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
