export const fetchByCountryCode = async (cca: string) => {
  const response = await fetch(`/api/alpha/${cca}?fields=name,population,region,subregion,capital,tld,currencies,languages,flags,borders`, { method: "GET" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const fetchBorderCountryName = async (codes: string[]) => {
  const response = await fetch(`/api/alpha?codes=${codes.join(",")}&fields=name,cca2`, { method: "GET" });
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error(data.message);
  return data;
};
