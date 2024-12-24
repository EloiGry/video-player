import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ErrorProps = {
  message: string;
  className?: string;
};

export function Error({ message, className }: ErrorProps) {
  return (
    <div
      className={cn(
        "flex items-center shadow-sm",
        className
      )}
    >
      <AlertTriangle className="w-5 h-5 mr-3" />
      <span>{message}</span>
      </div>
  );
}