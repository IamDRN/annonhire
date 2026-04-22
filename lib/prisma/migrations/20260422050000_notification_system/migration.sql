ALTER TABLE "Notification"
RENAME COLUMN "description" TO "message";

ALTER TABLE "Notification"
ADD COLUMN "type" TEXT NOT NULL DEFAULT 'general';

ALTER TABLE "Notification"
ADD COLUMN "isRead" BOOLEAN NOT NULL DEFAULT false;

UPDATE "Notification"
SET "isRead" = CASE
  WHEN "readAt" IS NOT NULL THEN true
  ELSE false
END;

ALTER TABLE "Notification"
DROP COLUMN "readAt";

DROP INDEX IF EXISTS "Notification_userId_readAt_idx";

CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");
