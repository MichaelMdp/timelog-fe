import { screen, render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, beforeEach, vi } from "vitest";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Calendar from "../../Calendar";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

describe("Calendar", () => {
  const user: UserEvent = userEvent.setup();

  beforeEach(() => {
    render(
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Calendar />
      </LocalizationProvider>
    );
  });

  it("renders all Days", () => {
    expect(screen.getByText(/Monday/i)).toBeInTheDocument();
    expect(screen.getByText(/Tuesday/i)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday/i)).toBeInTheDocument();
    expect(screen.getByText(/Thursday/i)).toBeInTheDocument();
    expect(screen.getByText(/Friday/i)).toBeInTheDocument();
  });
  it("renders all Entries", () => {
    expect(screen.getAllByText(/client 1/i)).toHaveLength(2);
    expect(screen.getAllByText(/client 2/i)).toHaveLength(1);
  });

  it("renders the modal", () => {
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByText(/09am/i)[0]);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders the modal delete button on selecting entry", async () => {
    await user.click(screen.getAllByText(/client 1/i)[0]);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("adds an entry when submitting the form", async () => {
    await user.click(screen.getAllByText(/09am/i)[0]);
    await user.click(screen.getByRole("button", { name: "Add entry" }));
    await waitForElementToBeRemoved(() => screen.queryByRole("heading"));
    expect(screen.getAllByText(/client 1/i)).toHaveLength(3);
  });
});
