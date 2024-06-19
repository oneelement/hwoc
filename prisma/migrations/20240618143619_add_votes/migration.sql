-- CreateTable
CREATE TABLE "folder_destination_votes" (
    "id" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "votes" INTEGER NOT NULL,
    "upVotes" INTEGER NOT NULL,
    "downVotes" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "folder_destination_votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "folder_destination_votes_folderId_idx" ON "folder_destination_votes"("folderId");

-- CreateIndex
CREATE INDEX "folder_destination_votes_destinationId_idx" ON "folder_destination_votes"("destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "folder_destination_votes_folderId_destinationId_key" ON "folder_destination_votes"("folderId", "destinationId");

-- AddForeignKey
ALTER TABLE "folder_destination_votes" ADD CONSTRAINT "folder_destination_votes_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folder_destination_votes" ADD CONSTRAINT "folder_destination_votes_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
