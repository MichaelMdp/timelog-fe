import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import Calendar from "../Pages/Calendar/Calendar";

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
