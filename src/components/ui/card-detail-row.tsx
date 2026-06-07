import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.utils";

interface Props extends ComponentPropsWithoutRef<"p"> {
  label: string;
  value: string;
}

export default function CardDetailRow(props: Props) {
  const { className, label, value, ...rest } = props;
  return (
    <p className={cn("text-foreground", className)} {...rest}>
      <span className="font-medium">{label}:</span>
      <span className="opacity-70 ml-1">{value}</span>
    </p>
  );
}
