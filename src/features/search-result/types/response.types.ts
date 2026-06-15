export interface BaseResponse {
  names: {
    common: string;
  };
  codes: {
    alpha_3: string;
  };
  capitals: {
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
  }[];
  flag: {
    description: string;
    url_svg: string;
    url_png: string;
  };
  region: string;
  population: number;
}
