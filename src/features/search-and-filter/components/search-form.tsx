import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import Input from "../../../components/ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) params.set("country", query.trim());
    else params.delete("country");
    setSearchParams(params, { replace: true });
  }, 600);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center flex-row-reverse shadow-md shadow-slate-500/10">
      <div className="w-full">
        <label htmlFor="country-name" className="sr-only">
          Country name
        </label>
        <Input placeholder="Search for a country..." className="" defaultValue={searchParams.get("country") || ""} onChange={(e) => debouncedSearch(e.target.value)} />
      </div>

      <span className="h-15 bg-card grid place-items-center pl-7 pr-3">
        <SearchIcon className="text-slate-300 w-5 h-5" />
      </span>
    </form>
  );
}
