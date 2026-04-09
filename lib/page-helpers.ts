export function getSingleParam(
  value: string | string[] | undefined,
  fallback: string,
) {
  return Array.isArray(value) ? value[0] ?? fallback : value ?? fallback;
}

export function getPageNumber(value: string | string[] | undefined) {
  const pageValue = Number.parseInt(getSingleParam(value, "1"), 10);

  if (Number.isNaN(pageValue) || pageValue < 1) {
    return 1;
  }

  return pageValue;
}
