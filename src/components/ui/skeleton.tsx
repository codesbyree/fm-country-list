import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.utils";

export default function Sekelton(props: ComponentPropsWithoutRef<"div">) {
  const { className, ...rest } = props;
  return <div className={cn("dark:bg-slate-600 animate-pulse bg-slate-200 rounded-md", className)} {...rest} />;
}
