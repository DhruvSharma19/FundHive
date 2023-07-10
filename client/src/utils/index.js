export const daysLeft = (deadline) => {
  try {

    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays.toFixed(0);
  } catch (err) {
    console.log(err);
  }
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  try {

    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
  } catch (err) {
    console.log(err);
  }
};
