import Calendar, { CalendarContext, CalendarDispatchContext } from "./Calendar";
import {CalendarControls} from "./CalendarControls"
import {
  calendarReducer,
  ReducerActionType,
  WorkEntry,
} from "./calendarReducer";

export type { WorkEntry };
export {
  calendarReducer,
  CalendarContext,
  CalendarDispatchContext,
  ReducerActionType,
  CalendarControls
};
export default Calendar;
