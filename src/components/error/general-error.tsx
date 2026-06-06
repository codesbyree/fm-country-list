import { TriangleAlertIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/cn.utils";

interface Props extends ComponentPropsWithoutRef<"div"> {
  errorMessage: string;
}

export default function GeneralError(props: Props) {
  const { className, errorMessage } = props;

  return (
    <div className={cn("flex flex-col items-center text-red-300 bg-red-600/20 border border-red-600 p-6 rounded-lg max-w-xs mx-auto w-full", className)}>
      <TriangleAlertIcon />
      <h4 className="mb-2 mt-6 font-medium">Something wrong happened!</h4>
      <p>{errorMessage}</p>
    </div>
  );
}
