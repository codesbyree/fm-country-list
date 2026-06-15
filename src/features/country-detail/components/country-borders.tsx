import { useQuery } from "@tanstack/react-query";
import type { ComponentPropsWithoutRef } from "react";
import { fetchBorderCountryName } from "../api/country-detail.api";
import CountryBordersSkeleton from "./country-borders-skeleton";
import { Link } from "react-router-dom";
import type { BorderResponse } from "../types/country-detail.types";

interface Props extends ComponentPropsWithoutRef<"div"> {
  alpha_3: string;
}

export default function CountryBorders(props: Props) {
  const { data, isLoading, isFetching, isPending, isError } = useQuery({ queryFn: async () => fetchBorderCountryName(props.alpha_3), queryKey: [] });

  const isActuallyLoading = isLoading || isFetching || isPending;

  if (isActuallyLoading) return <CountryBordersSkeleton />;
  if ((isError || !data?.objects.length) && !isActuallyLoading) return null;

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <h5 className="text-foreground text-lg font-medium">Border Countries:</h5>

      <div className="grid grid-cols-3 gap-2 lg:flex lg:flex-wrap">
        {(data.objects as BorderResponse[]).map((country) => (
          <Link
            to={`/${country.codes.alpha_3}`}
            replace
            key={country.codes.alpha_3}
            className="text-sm p-2 px-4 rounded-sm shadow-md bg-card text-center whitespace-nowrap overflow-hidden text-ellipsis text-foreground hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {country.names.common}
          </Link>
        ))}
      </div>
    </div>
  );
}
