import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import Input from "../../../components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../utils/cn.utils";

export default function SearchForm() {
  const [focused, setFocused] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) params.set("country", query.trim());
    else params.delete("country");
    setSearchParams(params, { replace: true });
  }, 300);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={cn(
        "flex items-center flex-row-reverse shadow-md shadow-slate-500/10 lg:min-w-100 rounded-md overflow-hidden bg-card transition-all border border-transparent",
        focused && "bg-slate-100 border-slate-300 dark:bg-slate-700 dark:border-slate-600",
      )}
    >
      <div className="w-full">
        <label htmlFor="country-name" className="sr-only">
          Country name
        </label>
        <Input
          placeholder="Search for a country..."
          className=""
          id="country-name"
          defaultValue={searchParams.get("country") || ""}
          autoComplete="off"
          onChange={(e) => debouncedSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      <span className="h-15 grid place-items-center pl-7 pr-3">
        <SearchIcon className="text-slate-400 w-5 h-5" />
      </span>
    </form>
  );
}
