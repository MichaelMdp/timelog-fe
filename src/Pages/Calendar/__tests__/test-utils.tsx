import React, { Dispatch, ReactElement, useReducer } from "react";
import { render, RenderOptions } from "@testing-library/react";
import {
  CalendarContext,
  CalendarDispatchContext,
} from "../Calendar";
import {
  calendarState,
  ReducerAction,
  calendarReducer
} from "../calendarReducer";
import moment from "moment";
import mockWorkEntries from "../../../data/mockedEntries";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

const initialState: calendarState = {
  entries: mockWorkEntries(),
  modalState: {
    showModal: false,
    description: "",
    startTime: moment(),
    duration: 1,
    activeEntryId: null,
    clientId: 1,
  },
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CalendarDispatchContext.Provider value={dispatch}>
        <CalendarContext.Provider value={state}>
          {children}
        </CalendarContext.Provider>
      </CalendarDispatchContext.Provider>
    </LocalizationProvider>
  );
};

const renderWithAllProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });


const renderWithDispatchContext = (component: React.ReactElement, dispatch:(value: ReducerAction) => void) => {
  render(
    <CalendarDispatchContext.Provider value={dispatch}>
      {component}
    </CalendarDispatchContext.Provider>
  );
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithAllProviders, renderWithDispatchContext };
