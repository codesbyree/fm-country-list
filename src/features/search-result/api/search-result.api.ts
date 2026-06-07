export const fetchCountryList = async (countryName?: string, regionName?: string) => {
  try {
    let countries;
    if (regionName) countries = await fetchByRegion(regionName);
    else countries = await fetchAllCountry();

    const shouldFetchAll = !countryName;
    if (shouldFetchAll) return countries;

    return countries.filter((country) => {
      const cName = country.name.official.toLowerCase();
      const searchName = countryName.trim().toLowerCase();
      const cNameMatch = cName.includes(searchName);
      return cNameMatch;
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
  }
};

const fetchAllCountry = async () => {
  const response = await fetch("/api/all?fields=name,flags,population,region,capital,cca3", { method: "GET" });
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error(data.message);
  return data;
};

const fetchByRegion = async (regionName: string) => {
  const response = await fetch(`/api/region/${regionName.trim().toLowerCase()}?fields=name,flags,population,region,capital,cca2`, { method: "GET" });
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error(data.message);
  return data;
};
