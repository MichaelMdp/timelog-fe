import { useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
// icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from '@mui/icons-material/Delete';
import moment, { Moment } from "moment";
// custom stuff
import { ReducerActionType } from "./calendarReducer";
import { CalendarContext, CalendarDispatchContext } from "./Calendar";

type Props = {};

export default function EntryForm({}: Props) {
  const state = useContext(CalendarContext);
  const dispatch = useContext(CalendarDispatchContext);

  // dispatch behavior
  const cancel = () => {
    dispatch({ type: ReducerActionType.CANCEL_ENTRY });
  };

  const submitEntry = () => {
    dispatch({ type: ReducerActionType.SUBMIT_ENTRY });
  };

  const deleteEntry = () => {
    const id = state.modalState.activeEntryId ? state.modalState.activeEntryId : ""
    dispatch({ type: ReducerActionType.DELETE_ENTRY, payload: id });
  };

  // form change event handlers
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      dispatch({
        type: ReducerActionType.UPDATE_FIELD,
        payload: { name: "duration", value: newValue },
      });
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "hours":
        dispatch({
          type: ReducerActionType.UPDATE_FIELD,
          payload: {
            name: "duration",
            value: event.target.value === "" ? 0 : Number(event.target.value),
          },
        });
        break;
      case "description":
        dispatch({
          type: ReducerActionType.UPDATE_FIELD,
          payload: { name: "description", value: event.target.value },
        });
        break;
    }
  };
  const handleChangeProject = (event: SelectChangeEvent<Number>) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    dispatch({
      type: ReducerActionType.UPDATE_FIELD,
      payload: { name: "clientId", value: value },
    });
  };

  const handleChangeStartTime = (newValue: Moment | null) => {
    if (moment.isMoment(newValue)) {
      dispatch({
        type: ReducerActionType.UPDATE_FIELD,
        payload: { name: "startTime", value: newValue },
      });
    }
  };

  return (
    <Dialog open={state.modalState.showModal} onClose={cancel}>
      <DialogTitle>
        {state.modalState.activeEntryId && (<>Edit </>)}
        Log Time
        </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a time log entry to the calendar.
        </DialogContentText>
        <Grid container spacing={1} mt={4} alignItems="center">
          <Grid item>
            <TimePicker
              label="Start time"
              value={state.modalState.startTime}
              onChange={handleChangeStartTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel id="project-input-label">Project</InputLabel>
              <Select
                labelId="project-input-label"
                id="demo-simple-select"
                value={state.modalState.clientId}
                label="Project"
                onChange={handleChangeProject}
              >
                <MenuItem value={1}>Client 1</MenuItem>
                <MenuItem value={2}>Client 2</MenuItem>
                <MenuItem value={3}>Client 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1} mt={4} alignItems="center">
          <Grid item>
            <AccessTimeIcon />
          </Grid>
          <Grid item xs>
            <Slider
              value={state.modalState.duration}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              step={0.25}
              min={0}
              max={8}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <Input
              sx={{ width: "50px" }}
              value={state.modalState.duration}
              size="small"
              name="hours"
              onChange={handleInputChange}
              //onBlur={handleBlur}
              inputProps={{
                step: 0.25,
                min: 0,
                max: 8,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
          <Grid item>
            <Typography>hours</Typography>
          </Grid>
        </Grid>
        <TextField
          margin="dense"
          id="description"
          label="Work details ..."
          type="text"
          fullWidth
          variant="standard"
          name="description"
          value={state.modalState.description}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        {state.modalState.activeEntryId && (
          <Button color="error" variant="contained" onClick={deleteEntry} startIcon={<DeleteIcon/>}>
            Delete
          </Button>
        )}

        <Button variant="outlined" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={submitEntry}>
          {state.modalState.activeEntryId ? "Update" : "Add entry"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
