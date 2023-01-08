import { Button, ButtonProps, styled, Toolbar } from "@mui/material";
import moment, { Moment } from "moment";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { margin } from "@mui/system";

type Props = {
  week: Moment;
  setWeek: (week: Moment) => void;
};

const CalendarControlsButton = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: "0 0 0 16px",
}));

export function CalendarControls({ week, setWeek }: Props) {
  const lastWeek = () => {
    return setWeek(week.clone().subtract(7, "days"));
  };
  const currentWeek = () => {
    return setWeek(moment());
  };
  const nextWeek = () => {
    return setWeek(week.clone().add(7, "days"));
  };

  return (
    <Toolbar disableGutters>
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
    </Toolbar>
  );
}
