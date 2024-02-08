const YEAR = 12;
const ANNUAL_PRICE = 19900;

export const getAnnualFormattedPrice = (price: number, currency: string) => {
  if (price === ANNUAL_PRICE) {
    return `€${price / 100 / YEAR}`;
  }
  if (currency === "USD") {
    return `$${price / 100 / YEAR}`;
  }

  if (currency === "GBP") {
    return `$${price / 100 / YEAR}`;
  }
  return `€${price / 100 / YEAR}`;
};
