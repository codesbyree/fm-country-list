import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { fetchByCountryCode } from "../api/country-detail.api";
import { parseCountryCCACode } from "../utils/country-detail.utils";
import { toMS } from "../../../utils/time.utils";
import type { CountryData } from "../types/country-detail.types";

import CountryDetailSkeleton from "./country-detail-skeleton";
import GeneralError from "../../../components/error/general-error";
import CountryDetailCard from "./country-detail-card";

export default function CountryDetail() {
  const { cca } = useParams();

  const { data, isLoading, isPending, isFetching, isError } = useQuery({ queryKey: [cca], queryFn: async () => fetchByCountryCode(parseCountryCCACode(cca)), staleTime: toMS(0, 5, 0) });

  const isActuallyLoading = isLoading || isPending || isFetching;

  if (isActuallyLoading) return <CountryDetailSkeleton />;
  if (isError && !isActuallyLoading) return <GeneralError errorMessage="Failed to fetch country detail" />;
  return <CountryDetailCard data={data as CountryData} />;
}
