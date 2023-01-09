import { render, screen } from "@testing-library/react";
import Day from "../.";
import mockWorkEntries from "../../../data/mockedEntries";
import moment from "moment";
import {it, beforeEach } from 'vitest'
import { WorkEntry } from "../../Calendar";

interface LocalTestContext {
    entriesMock: WorkEntry[];
}

describe("Day", () => {

  beforeEach<LocalTestContext>(({entriesMock}) => {
    entriesMock = mockWorkEntries();
    const startDate = entriesMock[0].startTime
    render(
        <Day
          title={startDate.format("dddd")}
          date={startDate}
          entries={entriesMock.filter((entry) => {
            return entry.startTime.isSame(startDate, "day");
          })}
        />
        );
  });

  it<LocalTestContext>("renders a Day", () => {
    expect(screen.getByText("Monday")).toBeInTheDocument();
  });

  it<LocalTestContext>("renders the start time", () => {
    expect(screen.getByText("08am")).toBeInTheDocument();
  });
  it<LocalTestContext>("renders the end time", () => {
    expect(screen.getByText("07pm")).toBeInTheDocument();
  });
  it<LocalTestContext>("renders entries", () => {
    expect(screen.getByText("client 1")).toBeInTheDocument();
    expect(screen.getByText("client 2")).toBeInTheDocument();
  });
});
