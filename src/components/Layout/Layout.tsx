import { Box, Container } from "@mui/material";
import Header from "../Header/Header";
import Calendar from "../Calendar/Calendar";

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
}
