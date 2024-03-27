import { NavBar } from "../components/navbar/navbar.component";
import { Outlet } from "react-router-dom";
import { Modal } from "../components/modal/modal.component";
import { useModal } from "../context/modalContext";

import "./appLayout.styles.css";

export const AppLayout = () => {
  const {closeModal, modals } = useModal();
  return (
    <>
{/*       <header>
        <NavBar />
      </header> */}
      <main>
        <div className="main-content">
          <Outlet />{" "}
        </div>
      </main>
      {modals.map((modal, index) => (
        <Modal
          key={index} // Consider using a more stable identifier
      
          closeModal={closeModal}
          className={modal.id} // Use the ID or another property for custom styling if needed
        >
          {modal.content}
        </Modal>
      ))}
    </>
  );
};
