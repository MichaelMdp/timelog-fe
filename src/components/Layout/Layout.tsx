import { Box } from "@mui/material"
import Header from "../Header/Header";
import Calendar from "../Calendar/Calendar";

type Props = {
    children?: React.ReactNode;
  };

export default function Layout ({children}: Props) {
    return (
        <Box>
            <Header />
            {children}
        </Box>
    )
}