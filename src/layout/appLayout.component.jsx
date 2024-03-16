import { NavBar } from "../components/navbar/navbar.component";

import './appLayout.styles.css'

export const AppLayout = ({ children }) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="main-content">{children}</div>
      </main>
    </>
  );
};
