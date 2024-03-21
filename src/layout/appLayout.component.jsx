import { NavBar } from "../components/navbar/navbar.component";

import { Modal as GlobalModal } from "../components/modal/modal.component";
import { useModal } from "../context/modalContext";

import "./appLayout.styles.css";

export const AppLayout = ({ children }) => {
  const { isModalOpen, modalContent, closeModal } = useModal();
  return (
    <>
      {isModalOpen && (
        <GlobalModal closeModal={closeModal}>{modalContent}</GlobalModal>
      )}
      <header>
        <NavBar />
      </header>
      <main>
        <div className="main-content">{children}</div>
      </main>
    </>
  );
};
