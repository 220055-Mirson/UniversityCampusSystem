-- CreateEnum
CREATE TYPE "ParkingSpotStatus" AS ENUM ('FREE', 'OCCUPIED', 'RESERVED', 'OUT_OF_SERVICE');

-- CreateEnum
CREATE TYPE "PlateDirection" AS ENUM ('IN', 'OUT');

-- CreateTable
CREATE TABLE "ParkingLot" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSpot" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "rowLabel" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "status" "ParkingSpotStatus" NOT NULL DEFAULT 'FREE',
    "plate" TEXT,
    "lotId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlateReading" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "direction" "PlateDirection" NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.9,
    "photoUrl" TEXT,
    "sensorCode" TEXT NOT NULL,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,
    "lotId" TEXT NOT NULL,
    "spotId" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlateReading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_code_key" ON "ParkingLot"("code");

-- CreateIndex
CREATE INDEX "ParkingSpot_lotId_status_idx" ON "ParkingSpot"("lotId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ParkingSpot_lotId_code_key" ON "ParkingSpot"("lotId", "code");

-- CreateIndex
CREATE INDEX "PlateReading_lotId_recordedAt_idx" ON "PlateReading"("lotId", "recordedAt");

-- CreateIndex
CREATE INDEX "PlateReading_plate_idx" ON "PlateReading"("plate");

-- CreateIndex
CREATE INDEX "PlateReading_spotId_idx" ON "PlateReading"("spotId");

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "ParkingLot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlateReading" ADD CONSTRAINT "PlateReading_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "ParkingLot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlateReading" ADD CONSTRAINT "PlateReading_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "ParkingSpot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
