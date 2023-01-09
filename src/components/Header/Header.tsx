import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";

type Props = {
  children?: React.ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: "flex", justifyContent: "space-between"}}>
          <Box>
            <ScheduleIcon sx={{ mr: 2 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
                mr: 2,
              }}
            >
              TimeLog App
            </Typography>
          </Box>
          <Box>
            <Button sx={{ color: "inherit" }}>Projects</Button>
            {/* <Button sx={{ color: "inherit" }}>menu 2</Button> */}
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
