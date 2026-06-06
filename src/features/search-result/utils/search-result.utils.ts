export const parseSearchParams = (searchParams: URLSearchParams) => {
  const res: Record<string, string> = {};
  searchParams.forEach((val, key) => {
    res[key] = val;
  });

  return res;
};

export const numberFormat = (num: number) => {
  return Intl.NumberFormat("id-ID").format(num);
};
