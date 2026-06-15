export const fetchByCountryCode = async (alpha_3: string) => {
  const baseUrl =
    "/api?response_fields=names.common,names.native,subregion,currencies,tlds,languages,codes.alpha_3,flag.url_svg,flag.url_png,flag.emoji,flag.description,region,capitals,population&codes.alpha_3=" +
    alpha_3;

  const response = await fetch(baseUrl, {
    method: "GET",
    headers: { Authorization: "Bearer " + import.meta.env.VITE_REST_COUNTRY_API_KEY },
  });

  const { data } = await response.json();
  if (!Array.isArray(data.objects)) throw new Error(data.message);
  return data;
};

export const fetchBorderCountryName = async (codes: string) => {
  const baseUrl = "/api/borders/" + codes + "?response_fields=names.common,codes.alpha_3";

  const response = await fetch(baseUrl, {
    method: "GET",
    headers: { Authorization: "Bearer " + import.meta.env.VITE_REST_COUNTRY_API_KEY },
  });

  const { data } = await response.json();
  if (!Array.isArray(data.objects)) throw new Error(data.message);
  return data;
};
