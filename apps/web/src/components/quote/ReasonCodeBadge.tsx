import { Badge } from "@/components/ui/Badge";
import { REASON_CODE_LABELS } from "@/lib/constants";

interface ReasonCodeBadgeProps {
  code: string;
}

export function ReasonCodeBadge({ code }: ReasonCodeBadgeProps) {
  const label = REASON_CODE_LABELS[code] || code;
  const isSuccess = code.startsWith("OK_");
  const variant = isSuccess ? "success" : "destructive";

  return (
    <Badge variant={variant} title={`Reason: ${label}`}>
      {label}
    </Badge>
  );
}
