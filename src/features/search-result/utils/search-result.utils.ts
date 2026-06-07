export const parseSearchParams = (searchParams: URLSearchParams) => {
  const res: Record<string, string> = {};
  searchParams.forEach((val, key) => {
    res[key] = val;
  });

  return res;
};
