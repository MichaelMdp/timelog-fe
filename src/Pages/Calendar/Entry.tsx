import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { CalendarDispatchContext } from "../../Pages/Calendar/Calendar";
import { ReducerActionType, WorkEntry } from "../../Pages/Calendar/calendarReducer";

type Props = {
  entry: WorkEntry;
  ypos: number;
  height: number;
};

export default function Entry({ entry, height, ypos }: Props) {
  const dispatch = useContext(CalendarDispatchContext);

  function editEntry(id: string): void {
    dispatch({
      type: ReducerActionType.EDIT_ENTRY,
      payload: id,
    });
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: `${ypos}px`,
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          opacity: 0.6,
          zIndex: 1,
          ml: "60px",
          height: `${height}px`,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          borderRight: "3px solid",
          bgcolor: entry.color,
          p: 1,
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
        onClick={() => editEntry(entry.id ? entry.id : "")}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography
            fontWeight={600}
            sx={{ opacity: 1, fontSize: 12, color: "#eee" }}
          >
            {entry.client.name}
          </Typography>
          <Typography
            noWrap
            sx={{
              fontSize: 11,
              color: "#eee",
              textAlign: "right",
            }}
          >
            {entry.duration}h
          </Typography>
        </Box>

        <Box
          sx={{
            mt: -0.5,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            noWrap
            sx={{
              fontSize: 11,
              color: "#eee",
              textAlign: "right",
            }}
          >
            {entry.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
