-- CreateTable
CREATE TABLE "poll_options" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,

    CONSTRAINT "poll_options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "poll_options" ADD CONSTRAINT "poll_options_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
