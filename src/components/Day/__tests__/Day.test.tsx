import { screen, render, fireEvent } from "@testing-library/react";
import Day from "../.";
import mockWorkEntries from "../../../data/mockedEntries";
import { it, beforeEach, vi } from "vitest";
import { ReducerAction } from "../../Calendar/calendarReducer";
import { ReducerActionType } from "../../Calendar";
import { renderWithDispatchContext } from "../../../Util/test-utils";

// mocked dispatch
const dispatchImplementation = (value: ReducerAction) => {};
const mockedDispatch = vi.fn(dispatchImplementation);

// Provider wrapped
const renderWithProviders = (component: React.ReactElement) =>  renderWithDispatchContext(component, mockedDispatch)

const entriesMock = mockWorkEntries();
const startDate = entriesMock[0].startTime;
const entries = entriesMock.filter((entry) => {
  return entry.startTime.isSame(startDate, "day");
});

describe("Day", () => {
  beforeEach(() => {
    renderWithProviders(
      <Day
        title={startDate.format("dddd")}
        date={startDate}
        entries={entries}
      />
    );
  });

  it("renders a Day", () => {
    expect(screen.getByText(/Monday/i)).toBeInTheDocument();
  });

  it("renders the start time", () => {
    expect(screen.getByText(/08am/i)).toBeInTheDocument();
  });
  it("renders the end time", () => {
    expect(screen.getByText(/07pm/i)).toBeInTheDocument();
  });
  it("renders entries", () => {
    expect(screen.getByText(/client 1/i)).toBeInTheDocument();
    expect(screen.getByText(/client 2/i)).toBeInTheDocument();
  });

  it("dispatches Add new entry on timblock click", () => {
    const expectedParams = {
      type: ReducerActionType.ADD_NEW_ENTRY,
      payload: entries[0].startTime.clone().hours(10),
    }

    fireEvent.click(screen.getByText(/10am/i));
    expect(mockedDispatch).toHaveBeenCalledWith(expectedParams);
  });
});
