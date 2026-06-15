import { useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  total: number;
  more: boolean;
}

export default function Pagination({ total, more }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  // 1. Parse offset as item skip (defaults to 0 items skipped)
  const currentOffset = Number(searchParams.get("offset") ?? "0");
  const urlLimit = Number(searchParams.get("limit") ?? "10");

  // 2. Calculate current page and total pages for the UI display
  const currentPageNumber = Math.floor(currentOffset / urlLimit) + 1;
  const totalPages = Math.ceil(total / urlLimit) || 1;

  const [localLimit, setLocalLimit] = useState(urlLimit);

  useEffect(() => {
    setLocalLimit(urlLimit);
  }, [urlLimit]);

  const [debouncedLimit] = useDebounce(localLimit, 800);

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, value);
      // Reset offset to 0 if the limit changes
      if (key === "limit") params.set("offset", "0");
      navigate(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, navigate],
  );

  useEffect(() => {
    if (debouncedLimit !== urlLimit && debouncedLimit >= 1 && debouncedLimit <= 100) {
      updateParams("limit", String(debouncedLimit));
    }
  }, [debouncedLimit, urlLimit, updateParams]);

  // 3. Adjust offset by the item limit instead of 1
  const handlePageChange = useCallback(
    (direction: number) => {
      const delta = direction * urlLimit;
      // Clamp the minimum offset to 0
      const newOffset = Math.max(0, currentOffset + delta);
      updateParams("offset", String(newOffset));
    },
    [currentOffset, urlLimit, updateParams],
  );

  const handleLimitChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      setLocalLimit(val);
    }
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-white border border-neutral-200 shadow-lg shadow-black/5 rounded-full px-4 py-2.5">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentOffset === 0} // Disabled if we are on the first items
          aria-label="Previous page"
          className="flex items-center justify-center w-8 h-8 rounded-full transition-colors
            text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-500"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
        </button>

        <span className="text-sm text-neutral-500 tabular-nums whitespace-nowrap select-none">
          <span className="font-semibold text-neutral-800">{currentPageNumber}</span>
          {" / "}
          <span>{totalPages}</span>
        </span>

        <button
          onClick={() => handlePageChange(1)}
          disabled={!more || currentOffset + urlLimit >= total} // Disabled if no more items or reached total limit
          aria-label="Next page"
          className="flex items-center justify-center w-8 h-8 rounded-full transition-colors
            text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-500"
        >
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>

        <div className="w-px h-5 bg-neutral-200" />

        <div className="flex items-center gap-1.5">
          <label htmlFor="pagination-limit" className="text-xs text-neutral-400 select-none">
            Per page
          </label>
          <input
            id="pagination-limit"
            type="number"
            min={1}
            max={100}
            value={localLimit === 0 ? "" : localLimit}
            onChange={handleLimitChange}
            className="w-14 text-sm text-center font-medium text-neutral-800
              border border-neutral-200 rounded-full px-2 py-1
              focus:outline-none focus:ring-2 focus:ring-neutral-300
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
