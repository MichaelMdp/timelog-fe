import { Moment } from "moment";

const firstDayOfTheWeek = (date: Moment) => {
  const providedDate = date.clone();
  // todo: check if we can configure moment to use Monday as the first day of the week
  if (providedDate.weekday() === 0) providedDate.subtract(1, "day");
  return providedDate.startOf("week").add(1, "d");
};

export default firstDayOfTheWeek;
