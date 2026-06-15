export const parseSearchParams = (searchParams: URLSearchParams) => {
  return {
    region: searchParams.get("region") ?? "",
    country: searchParams.get("country") ?? "",
    offset: Number(searchParams.get("offset") ?? 0),
    limit: Number(searchParams.get("limit") ?? 10),
  };
};

export const mergeUrl = (...paths: string[]) => {
  return paths
    .map((p) => {
      if (p.split("=")[1] !== "undefined") return p;
      return undefined;
    })
    .filter((p) => p)
    .join("&");
};
