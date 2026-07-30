-- CreateEnum
CREATE TYPE "QueueStatus" AS ENUM ('WAITING', 'CALLED', 'SERVING', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Patient" (
    "id" UUID NOT NULL,
    "fullName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueEntry" (
    "id" UUID NOT NULL,
    "ticketNumber" SERIAL NOT NULL,
    "status" "QueueStatus" NOT NULL DEFAULT 'WAITING',
    "patientId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "QueueEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QueueEntry_ticketNumber_key" ON "QueueEntry"("ticketNumber");

-- CreateIndex
CREATE INDEX "QueueEntry_status_createdAt_idx" ON "QueueEntry"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "QueueEntry" ADD CONSTRAINT "QueueEntry_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
