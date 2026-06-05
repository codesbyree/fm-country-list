import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.utils";

export default function Input(props: ComponentPropsWithoutRef<"input">) {
  const { className, value, onChange, placeholder, ...rest } = props;

  return (
    <input
      className={cn("bg-card text-input placeholder:text-slate-300 p-4 h-15 w-full border-none outline-none text-sm", className)}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
}
