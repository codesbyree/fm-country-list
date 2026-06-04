import { type ComponentPropsWithoutRef } from "react";
import { useTheme } from "../stores/theme.stores";
import { cn } from "../../../utils/cn.utils";

export default function ThemeProvider(props: ComponentPropsWithoutRef<"div">) {
  const theme = useTheme((s) => s.theme);
  return <div className={cn("bg-background min-h-dvh w-full", theme)}>{props.children}</div>;
}
