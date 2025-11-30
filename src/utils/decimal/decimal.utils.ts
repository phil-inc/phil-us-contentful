import Decimal from "decimal.js";

export const toDecimal = (input: number | string | Decimal): Decimal => {
  return new Decimal(input ?? 0);
};

export const toDecimalRounded = (
  input: number | string | Decimal,
  precision = 2,
): Decimal => {
  const decimalValue = toDecimal(input);
  return decimalValue.toDecimalPlaces(precision, Decimal.ROUND_HALF_UP);
};
