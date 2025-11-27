import Decimal from 'decimal.js';

export const toDecimal = (input: number | string | Decimal): Decimal => {
  return new Decimal(input);
};

export const getAbsoluteDifference = (a: Decimal, b: Decimal): Decimal => {
  return a.sub(b).abs();
};

export const toDecimalRounded = (input: number | string | Decimal): Decimal => {
  const decimalValue = toDecimal(input);
  return decimalValue.toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
};
