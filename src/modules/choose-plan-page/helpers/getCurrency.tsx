export const getCurrency = (currency: string) => {
  if (currency === "USD") {
    return "$";
  }

  if (currency === "GBP") {
    return "£";
  }

  return "€";
};
