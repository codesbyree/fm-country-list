export interface CountryData {
  names: {
    common: string;
    native: Record<
      string,
      {
        common: string;
        official: string;
      }
    >;
  };
  codes: {
    alpha_3: string;
  };
  capitals: Array<{
    attributes: {
      administrative: boolean;
      constitutional: boolean;
      executive: boolean;
      judicial: boolean;
      legislative: boolean;
      primary: boolean;
    };
    coordinates: {
      lat: number;
      lng: number;
    };
    name: string;
  }>;
  flag: {
    description: string;
    emoji: string;
    url_png: string;
    url_svg: string;
  };
  region: string;
  subregion: string;
  currencies: Array<{
    code: string;
    name: string;
    symbol: string;
  }>;
  languages: Array<{
    bcp47: string;
    iso639_1: string;
    iso639_2b: string;
    iso639_2t: string;
    iso639_3: string;
    name: string;
    native_name: string;
  }>;
  population: number;
  tlds: string[];
}

export interface BorderResponse {
  names: {
    common: string;
  };
  codes: {
    alpha_3: string;
  };
}
