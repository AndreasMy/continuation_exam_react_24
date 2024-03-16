import { NavBar } from "../components/navbar/navbar.component";

export const AppLayout = ({ children }) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
    </>
  );
};
