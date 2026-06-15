import type { CountryData } from "../types/country-detail.types";

export const parseCountryCCACode = (code?: string) => {
  return code ?? "";
};

export const getNativeName = (country: CountryData) => {
  try {
    const nativeNameObj = country.names.native;
    if (!nativeNameObj) return country.names.common;
    const values = Object.values(nativeNameObj);

    return values[0].common || country.names.common;
  } catch {
    return "-";
  }
};

export const getCurrencies = (country: CountryData) => {
  try {
    const currencyObj = country.currencies;
    return Object.entries(currencyObj).map(([, val]) => val.name);
  } catch {
    return [];
  }
};

export const getLanguages = (country: CountryData) => {
  try {
    return country.languages.map((l) => l.native_name);
  } catch {
    return [];
  }
};
