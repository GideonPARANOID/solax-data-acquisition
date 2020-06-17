export const getDayRange = (date: Date) => {
  const next = new Date(date.getTime());
  next.setDate(new Date(date.getTime()).getDate() + 1);
  return {
    date: {
      $gt: date,
      $lte: next,
    },
  };
};
