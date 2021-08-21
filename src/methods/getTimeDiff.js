export const getTimeDiff = (date1, date2) => {
  const from = new Date(date1);
  const to = new Date(date2);
  var differenceTravel = to.getTime() - from.getTime();
  var minutes = Math.floor(differenceTravel / (1000 * 60));

  return minutes / 60;
};
