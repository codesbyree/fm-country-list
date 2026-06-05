import { useState, createContext, type ReactNode, useContext, type Dispatch, type SetStateAction, type ComponentPropsWithoutRef, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../utils/cn.utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

interface Context {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selected: string;
  setSelected: (val: string) => void;
  label: string;
  setLabel: Dispatch<SetStateAction<string>>;
  ref: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>; // 👈 to return focus on close
  onValueChange: (val: string) => void;
  focusedIndex: number;
  setFocusedIndex: Dispatch<SetStateAction<number>>;
  listboxId: string; // 👈 for aria-controls
}

const SelectContext = createContext<Context | undefined>(undefined);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) throw new Error("useSelectContext must be used within a Select");
  return context;
}

interface SelectProps extends ComponentPropsWithoutRef<"div"> {
  onValueChange?: (val: string) => void;
}

export function Select(props: SelectProps) {
  const { className, children, onValueChange, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [selected, setSelected] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const handleValueChange = (val: string) => onValueChange?.(val);

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        label,
        setLabel,
        ref,
        triggerRef,
        onValueChange: handleValueChange,
        selected,
        setSelected,
        focusedIndex,
        setFocusedIndex,
        listboxId,
      }}
    >
      <div ref={ref} className={cn("relative w-full", className)} {...rest}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger(props: ComponentPropsWithoutRef<"button">) {
  const { open, setOpen, setFocusedIndex, listboxId, triggerRef } = useSelectContext();
  const { className, children, ...rest } = props;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setFocusedIndex(0); // 👈 jump into list
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      setFocusedIndex(0);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <button
      ref={triggerRef}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listboxId}
      className={cn("p-4 bg-card shadow-md shadow-slate-500/10 h-15 text-foreground text-sm w-full", "flex items-center justify-between px-7 rounded-md cursor-pointer", className)}
      onClick={() => {
        setOpen(!open);
        setFocusedIndex(-1);
      }}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
      <ChevronDownIcon className={cn("rotate-0 transition-all w-4 h-4", open && "rotate-90")} />
    </button>
  );
}

export function SelectValue({ placeholder = "" }: { placeholder: string }) {
  const { label } = useSelectContext();
  return <span>{label.length ? label : placeholder}</span>;
}

export function SelectContent({ children }: { children: ReactNode }) {
  const { open, setOpen, ref } = useSelectContext();

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, ref, setOpen]);

  return (
    <div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 4, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 8, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 4, opacity: 0, filter: "blur(8px)" }}
            className="absolute w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SelectGroup({ children }: { children: ReactNode }) {
  const { listboxId, setFocusedIndex, setOpen, triggerRef } = useSelectContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const items = e.currentTarget.querySelectorAll<HTMLButtonElement>("[role='option']");
    const count = items.length;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => {
        const next = Math.min(i + 1, count - 1);
        items[next]?.focus();
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => {
        if (i <= 0) {
          // 👈 if at top, go back to trigger
          setOpen(false);
          triggerRef.current?.focus();
          return -1;
        }
        const prev = i - 1;
        items[prev]?.focus();
        return prev;
      });
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus(); // 👈 return focus to trigger
    } else if (e.key === "Tab") {
      setOpen(false); // 👈 natural tab flow closes the dropdown
    }
  };

  return (
    <ul id={listboxId} role="listbox" tabIndex={-1} onKeyDown={handleKeyDown} className="bg-card shadow-md shadow-slate-500/30 w-full py-3">
      {children}
    </ul>
  );
}

export function SelectItem({ children, value }: { children: ReactNode; value: string }) {
  const { setLabel, setOpen, onValueChange, selected, setSelected, focusedIndex, triggerRef } = useSelectContext();
  const itemRef = useRef<HTMLButtonElement>(null);

  // Auto-focus this item when focusedIndex matches its position
  // We derive index from the DOM to keep it decoupled 👇
  useEffect(() => {
    if (!itemRef.current) return;
    const list = itemRef.current.closest("[role='listbox']");
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLButtonElement>("[role='option']"));
    const index = items.indexOf(itemRef.current);
    if (index === focusedIndex) itemRef.current.focus();
  }, [focusedIndex]);

  const handleChange = () => {
    const childrenText = children as unknown as string;
    if (value === selected) {
      setSelected("");
      setLabel("");
      onValueChange("");
    } else {
      setSelected(value);
      setLabel(childrenText);
      onValueChange(value);
    }
    setOpen(false);
    triggerRef.current?.focus(); // 👈 return focus after selection
  };

  return (
    <li role="presentation">
      <button
        ref={itemRef}
        role="option"
        aria-selected={value === selected}
        onClick={handleChange}
        className="text-foreground text-sm p-2 px-7 cursor-pointer w-full text-left flex items-center justify-between focus:outline-none"
      >
        {children}
        <CheckIcon className={cn("w-4 h-4 opacity-0", value === selected && "opacity-100")} />
      </button>
    </li>
  );
}
