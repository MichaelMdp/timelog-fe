import { Box, Button, ButtonProps, styled, Toolbar } from "@mui/material";
import moment, { Moment } from "moment";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

type Props = {
  week: Moment;
  setWeek: (week: Moment) => void;
  reset: () => void;
};

const CalendarControlsButton = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: "0 0 0 16px",
}));

export function CalendarControls({ week, setWeek, reset }: Props) {
  const lastWeek = () => {
    return setWeek(week.clone().subtract(7, "days"));
  };
  const currentWeek = () => {
    return setWeek(moment());
  };
  const nextWeek = () => {
    return setWeek(week.clone().add(7, "days"));
  };
  const clearData = () => {
    reset();
  };

  return (
    <Toolbar
      disableGutters
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Box>
        <CalendarControlsButton
          startIcon={<KeyboardDoubleArrowLeftIcon />}
          variant="contained"
          onClick={lastWeek}
        >
          Last week
        </CalendarControlsButton>
        <CalendarControlsButton variant="outlined" onClick={currentWeek}>
          Now
        </CalendarControlsButton>
        <CalendarControlsButton
          endIcon={<KeyboardDoubleArrowRightIcon />}
          variant="contained"
          onClick={nextWeek}
        >
          next week
        </CalendarControlsButton>
      </Box>
      <Box sx={{ mr: 2 }}>
        <CalendarControlsButton
          onClick={clearData}
          sx={{ fontSize: "small" }}
          startIcon={<WarningAmberIcon />}
        >
          Reset Data
        </CalendarControlsButton>
      </Box>
    </Toolbar>
  );
}
