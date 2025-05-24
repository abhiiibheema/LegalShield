CREATE TABLE "Users"(
    "id" BIGINT NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Users" ADD PRIMARY KEY("id");
ALTER TABLE
    "Users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");
CREATE TABLE "Sessions"(
    "Sid" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "Title" VARCHAR(255) NOT NULL,
    "TimeStamp" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "Sessions" ADD PRIMARY KEY("Sid");
CREATE TABLE "Session Chat"(
    "Sid" BIGINT NOT NULL,
    "Question" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "Date" BIGINT NOT NULL
);
ALTER TABLE
    "Session Chat" ADD PRIMARY KEY("Sid");
ALTER TABLE
    "Session Chat" ADD CONSTRAINT "session chat_sid_foreign" FOREIGN KEY("Sid") REFERENCES "Sessions"("Sid");
ALTER TABLE
    "Users" ADD CONSTRAINT "users_id_foreign" FOREIGN KEY("id") REFERENCES "Sessions"("Sid");