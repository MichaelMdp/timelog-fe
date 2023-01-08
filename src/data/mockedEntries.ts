import moment from "moment";
import { WorkEntry } from "../components/Calendar/calendarReducer";

const startDate = moment().subtract(4, 'days')

const mockWorkEntries: Array<WorkEntry> = [
    {
      id: "1",
      client: { id: 1, name: "client 1" },
      startTime: startDate.clone().set({ hour: 9, minute: 0 }),
      duration: 1.5,
      color: "primary.main",
      description: "hard work",
    },
    {
      id: "2",
      client: { id: 2, name: "client 2" },
      startTime: startDate.clone().set({ hour: 13, minute: 0 }),
      duration: 1,
      color: "secondary.main",
      description: "more hard work",
    },
    {
      id: "3",
      client: { id: 1, name: "client 1" },
      startTime: startDate.clone().subtract(1, "day").set({ hour: 15, minute: 0 }),
      duration: 3,
      color: "primary.main",
      description: "review meeting",
    },
  ];

  export default mockWorkEntries