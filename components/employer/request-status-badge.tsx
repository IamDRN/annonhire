import { ContactRequestStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const statusMap: Record<ContactRequestStatus, "default" | "success" | "warning" | "danger" | "info"> = {
  PENDING: "warning",
  ACCEPTED: "success",
  REJECTED: "danger",
  EXPIRED: "default",
  WITHDRAWN: "default",
  NEEDS_MORE_DETAILS: "info"
};

export function RequestStatusBadge({ status }: { status: ContactRequestStatus }) {
  return <Badge variant={statusMap[status]}>{status.replaceAll("_", " ")}</Badge>;
}
