import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.utils";

export default function Button(props: ComponentPropsWithoutRef<"button">) {
  const { className, children, onClick, disabled, ...rest } = props;

  return (
    <button className={cn("text-foreground flex items-center gap-2 text-sm", className)} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
