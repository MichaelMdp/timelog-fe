import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Entry from "../Entry";
import mockWorkEntries from "../../../data/mockedEntries";
import { CalendarDispatchContext } from "../../Calendar";
import { ReducerAction } from "../../Calendar/calendarReducer";

// mocked dispatch
const dispatchImplementation = (value: ReducerAction) => {};
const mockedDispatch = vi.fn(dispatchImplementation);

// Provider wrapped
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <CalendarDispatchContext.Provider value={mockedDispatch}>
      {component}
    </CalendarDispatchContext.Provider>
  );
};

describe("Entry", () => {
  beforeEach(() => {
    const entryMock = mockWorkEntries()[0];
    renderWithProviders(<Entry entry={entryMock} height={100} ypos={0} />);
  });

  it("renders an Entry", () => {
    //screen.debug();
    expect(screen.getByText(/client 1/i)).toBeInTheDocument();
    expect(screen.getByText(/1.5h/i)).toBeInTheDocument();
    expect(screen.getByText(/hard work/i)).toBeInTheDocument();
  });

  it("dispatches when clicked", () => {
    fireEvent.click(screen.getByText(/client 1/i));
    expect(mockedDispatch).toBeCalled();
  });
});
