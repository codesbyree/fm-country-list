import { mergeUrl } from "../utils/search-result.utils";

export const fetchAllCountry = async (country: string, region: string, offset: string, limit: string) => {
  const baseUrl = "/api?response_fields=names.common,codes.ccn3,flag.url_svg,flag.url_png,flag.emoji,flag.description,region,capitals,population";
  const countryQuery = country ? "q=" + country : "";
  const regionQuery = region ? "region=" + region : "";
  const offsetQuery = `offset=${Number(offset)}`;
  const limitQuery = `limit=${Number(limit) || 10}`;
  const response = await fetch(mergeUrl(baseUrl, countryQuery, regionQuery, offsetQuery, limitQuery), {
    method: "GET",
    headers: { Authorization: "Bearer " + import.meta.env.VITE_REST_COUNTRY_API_KEY },
  });

  const { data } = await response.json();
  if (!Array.isArray(data.objects)) throw new Error(data.message);
  return data;
};
