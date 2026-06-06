import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.utils";

interface Props extends ComponentPropsWithoutRef<"div"> {
  ratio: number;
}

export default function AspectRatio(props: Props) {
  const { children, className, ratio } = props;
  const paddingTop = `${(1 / ratio) * 100}%`;
  return (
    <div className="relative w-full" style={{ paddingTop }}>
      <div className={cn("absolute top-0 left-0 w-full h-full", className)}>{children}</div>
    </div>
  );
}
