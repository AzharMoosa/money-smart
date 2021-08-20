export const computePercentage = (amountRequired, amountSaved) => {
  const percentage = Math.floor((amountSaved / amountRequired) * 100);
  return percentage > 100 ? 100 : percentage;
};
