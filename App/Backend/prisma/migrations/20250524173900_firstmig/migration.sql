-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "Sid" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "Title" VARCHAR(255) NOT NULL,
    "TimeStamp" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("Sid")
);

-- CreateTable
CREATE TABLE "SessionChat" (
    "Sid" BIGINT NOT NULL,
    "Question" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "Date" BIGINT NOT NULL,

    CONSTRAINT "SessionChat_pkey" PRIMARY KEY ("Sid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_userId_key" ON "Sessions"("userId");

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionChat" ADD CONSTRAINT "SessionChat_Sid_fkey" FOREIGN KEY ("Sid") REFERENCES "Sessions"("Sid") ON DELETE RESTRICT ON UPDATE CASCADE;
