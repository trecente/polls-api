-- CreateTable
CREATE TABLE "vote" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    "pollOptionsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vote_sessionId_pollId_key" ON "vote"("sessionId", "pollId");

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_pollOptionsId_fkey" FOREIGN KEY ("pollOptionsId") REFERENCES "poll_options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
