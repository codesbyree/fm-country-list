import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { toMS } from "../../../utils/time.utils";
import { fetchCountryList } from "../api/search-result.api";
import { parseSearchParams } from "../utils/search-result.utils";
import type { BaseResponse } from "../types/response.types";

import CountryCard from "./country-card";
import GeneralError from "../../../components/error/general-error";
import CountryCardSekeleton from "./country-card-skeleton";
import GeneralErrorEmpty from "../../../components/error/general-error-empty";

export default function CountryCardList() {
  const [searchParams] = useSearchParams();
  const { region, country } = parseSearchParams(searchParams);

  const { data, isLoading, isFetching, isPending, isError } = useQuery({ queryKey: [region, country], queryFn: async () => fetchCountryList(country, region), staleTime: toMS(0, 5, 0) });

  if (isError)
    return (
      <section className="p-10">
        <GeneralError errorMessage="Failed to fetch country list" />
      </section>
    );

  if (!data?.length)
    return (
      <section className="p-10">
        <GeneralErrorEmpty />
      </section>
    );

  const isAcutallyLoading = isLoading || isFetching || isPending;

  const renderer = () => {
    if (isAcutallyLoading) return [1, 2, 3, 4, 5, 6, 7, 8].map((x) => <CountryCardSekeleton key={x} />);
    return (data as BaseResponse[]).map((d) => <CountryCard key={d.name.official} {...d} />);
  };

  return <ListWrapper>{renderer()}</ListWrapper>;
}

function ListWrapper({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col items-center gap-10 p-10 lg:grid lg:grid-cols-4 lg:px-0 lg:max-w-7xl lg:w-full lg:mx-auto lg:gap-x-13">{children}</section>;
}
