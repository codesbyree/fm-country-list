import type { CountryData } from "../types/country-detail.types";

export const parseCountryCCACode = (code?: string) => {
  return code ?? "";
};

export const getNativeName = (country: CountryData) => {
  const nativeNameObj = country.name.nativeName;
  if (!nativeNameObj) return country.name.common;
  const values = Object.values(nativeNameObj);

  return values[0].common || country.name.common;
};

export const getCurrencies = (country: CountryData) => {
  const currencyObj = country.currencies;
  return Object.entries(currencyObj).map(([, val]) => val.name);
};

export const getLanguages = (country: CountryData) => {
  const langObj = country.languages;
  return Object.entries(langObj).map(([, val]) => val);
};
