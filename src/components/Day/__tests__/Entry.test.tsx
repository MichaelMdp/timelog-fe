import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import {vi} from 'vitest'
import Entry from "../Entry";
import mockWorkEntries from "../../../data/mockedEntries";
import { CalendarDispatchContext } from "../../Calendar";
import { ReducerAction } from "../../Calendar/calendarReducer";


  const dispatchImplementation = (value: ReducerAction) => {}
  const mockedDispatch = vi.fn(dispatchImplementation)
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <CalendarDispatchContext.Provider value={mockedDispatch}>
      {component}
    </CalendarDispatchContext.Provider>
  );
};

describe("Entry", () => {
  it("renders an Entry", () => {
    const entryMock = mockWorkEntries()[0];
    render(<Entry entry={entryMock} height={100} ypos={0} />);

    //screen.debug();
    expect(screen.getByText(/client 1/i)).toBeInTheDocument();
    expect(screen.getByText(/1.5h/i)).toBeInTheDocument();
    expect(screen.getByText(/hard work/i)).toBeInTheDocument();
  });

  it("dispatches when clicked", () => {
    const entryMock = mockWorkEntries()[0];
    renderWithProviders(<Entry entry={entryMock} height={100} ypos={0} />);
    fireEvent.click(screen.getByText(/client 1/i));
    expect(mockedDispatch).toBeCalled()
  });
});
