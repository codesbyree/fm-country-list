import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toMS } from "../../../utils/time.utils";
import { fetchAllCountry } from "../api/search-result.api";
import { parseSearchParams } from "../utils/search-result.utils";
import type { BaseResponse } from "../types/response.types";
import CountryCard from "./country-card";
import GeneralError from "../../../components/error/general-error";
import CountryCardSekeleton from "./country-card-skeleton";
import GeneralErrorEmpty from "../../../components/error/general-error-empty";
import Pagination from "./pagination";

export default function CountryCardList() {
  const [searchParams] = useSearchParams();
  const { region, country } = parseSearchParams(searchParams);
  const offset = searchParams.get("offset") ?? "1";
  const limit = searchParams.get("limit") ?? "10";

  const { data, isLoading, isFetching, isPending, isError } = useQuery({
    queryKey: [region, country, offset, limit],
    queryFn: async () => fetchAllCountry(country, region, offset, limit),
    staleTime: toMS(0, 5, 0),
  });

  const isAcutallyLoading = isLoading || isFetching || isPending;

  if (isAcutallyLoading)
    return (
      <ListWrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <CountryCardSekeleton key={x} />
        ))}
      </ListWrapper>
    );

  if (isError)
    return (
      <section className="p-10">
        <GeneralError errorMessage="Failed to fetch country list" />
      </section>
    );

  if (!data?.objects.length && !isAcutallyLoading)
    return (
      <section className="p-10">
        <GeneralErrorEmpty />
      </section>
    );

  const renderer = () => (data.objects as BaseResponse[]).map((d) => <CountryCard key={d.names.common} {...d} />);

  return (
    <>
      <ListWrapper>{renderer()}</ListWrapper>
      <Pagination total={data.meta.total} more={data.meta.more} />
    </>
  );
}

function ListWrapper({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col items-center gap-10 p-10 lg:grid lg:grid-cols-4 lg:px-0 lg:max-w-7xl lg:w-full lg:mx-auto lg:gap-x-13">{children}</section>;
}
