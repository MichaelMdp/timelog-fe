import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";
import Entry from "../Entry";
import mockWorkEntries from "../../../data/mockedEntries";
import { ReducerAction } from "../../Calendar/calendarReducer";
import { renderWithDispatchContext } from "../../../Util/test-utils";

// mocked dispatch
const dispatchImplementation = (value: ReducerAction) => {};
const mockedDispatch = vi.fn(dispatchImplementation);

// Provider wrapped
const renderWithProviders = (component: React.ReactElement) =>  renderWithDispatchContext(component, mockedDispatch)

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
