import React, { useReducer, Dispatch, useState } from "react";
import { Stack } from "@mui/material";
import moment from "moment";

import {
  calendarReducer,
  calendarState,
  ReducerAction,
  ReducerActionType,
} from "./calendarReducer";
import Day from "../Day";
import EntryForm from "../EntryForm/EntryForm";

import mockWorkEntries from "../../data/mockedEntries";
import { CalendarControls } from "./CalendarControls";
import LocalStorageUtil from "../../Util/localStorageUtil";

// context

let storedEntries = LocalStorageUtil.getEntries();
if (!storedEntries) {
  storedEntries = mockWorkEntries();
  LocalStorageUtil.storeEntries(storedEntries);
}

const initialState: calendarState = {
  entries: storedEntries,
  modalState: {
    showModal: false,
    description: "",
    startTime: moment(),
    duration: 1,
    activeEntryId: null,
    clientId: 1,
  },
};
export const CalendarContext = React.createContext<calendarState>(initialState);
export const CalendarDispatchContext = React.createContext<
  Dispatch<ReducerAction>
>(() => null);

// component
export default function Calendar() {
  // reducer
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const [week, setWeek] = useState(moment());

  const reset = () => {
    dispatch({
      type: ReducerActionType.RESET_DATA,
      payload: mockWorkEntries()
    })
  }

  const getDays = (startDate: moment.Moment): Array<JSX.Element> => {
    const firstDayOfWeek = startDate.subtract(1, "d").startOf("week");
    const days: Array<moment.Moment> = [];
    for (let i = 0; i < 5; i++) {
      const date = firstDayOfWeek.add(1, "d").clone();
      days.push(date);
    }
    return days.map((d) => {
      return (
        <Day
          key={d.toISOString()}
          title={d.format("dddd")}
          date={d}
          entries={state.entries.filter((entry) => {
            return entry.startTime.isSame(d, "day");
          })}
        />
      );
    });
  };

  return (
    <>
      <CalendarDispatchContext.Provider value={dispatch}>
        <CalendarContext.Provider value={state}>
          <CalendarControls week={week} setWeek={setWeek} reset={reset} />
          <Stack
            direction={"row"}
            justifyContent="space-between"
            spacing={1.5}
            px={2}
          >
            {getDays(week)}
          </Stack>
          <EntryForm />
        </CalendarContext.Provider>
      </CalendarDispatchContext.Provider>
    </>
  );
}
