export const getTrialFormattedPrice = (price: number, currency: string) => {
  if (currency === "USD") {
    return `$${price / 100}`;
  }

  if (currency === "GBP") {
    return `£${price / 100}`;
  }

  return `€${price / 100}`;
};
