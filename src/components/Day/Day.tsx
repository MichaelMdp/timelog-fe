import { useContext } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import moment, { Moment } from "moment";

import { CalendarDispatchContext, ReducerActionType, WorkEntry } from "../Calendar";
import Entry from "./Entry";

type Props = {
  title: string;
  date: moment.Moment;
  entries: WorkEntry[];
};

export function Day({ title, date, entries }: Props) {
  const dispatch = useContext(CalendarDispatchContext);

  const blockHeight = 48;
  const blockPadding = 8;

  const workEntriesElements = entries.map((w, i) => {
    const height =
      w.duration * (blockHeight - blockPadding * 2) +
      (w.duration - 1) * (blockPadding * 2);
    const ypos = (w.startTime.hour() - blockPadding) * blockHeight;
    return <Entry entry={w} key={i} height={height} ypos={ypos} />;
  });

  const addNewEntry = (startTime: Moment) => {
    dispatch({
      type: ReducerActionType.ADD_NEW_ENTRY,
      payload: startTime,
    });
  };

  const timeBlockListItems = () => {
    const timeBlocks = [];
    for (let i = 8; i <= 19; i++) {
      timeBlocks.push(i);
    }
    return timeBlocks.map((t) => {
      const time = moment(date).hour(t);
      return (
        <ListItemButton
          sx={{ height: blockHeight }}
          key={time.toISOString()}
          onClick={() => addNewEntry(time)}
        >
          <ListItemText secondary={time.format("hha")} />
        </ListItemButton>
      );
    });
  }

  return (
    <>
      <List
        sx={{
          width: "100%",
          border: "1px",
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: date.isSame(moment(), "date") ? "lightsteelblue" : "inherit",
        }}
        subheader={
          <ListSubheader
            component="div"
            sx={{
              bgcolor: "inherit",
              borderRadius: 2,
            }}
          >
            {title}
            <Typography
              sx={{
                fontSize: 11,
                mt: -2,
                mb: 2,
              }}
            >
              {date.format("ll")}
            </Typography>
          </ListSubheader>
        }
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        >
          {workEntriesElements}
        </Box>
        
        {timeBlockListItems()}
      </List>
    </>
  );
}
