import { FolderIcon } from "lucide-react";
import { cn } from "../../utils/cn.utils";
import type { ComponentPropsWithoutRef } from "react";

export default function GeneralErrorEmpty(props: ComponentPropsWithoutRef<"div">) {
  const { className } = props;

  return (
    <div className={cn("flex flex-col items-center text-amber-600 dark:text-amber-300 bg-amber-600/20 border border-amber-600 p-6 rounded-lg max-w-xs mx-auto w-full", className)}>
      <FolderIcon />
      <h4 className="mb-2 mt-6 font-medium">There is nothing in here!</h4>
    </div>
  );
}
