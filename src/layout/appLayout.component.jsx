import { Outlet } from "react-router-dom";
import { Modal } from "../components/modal/modal.component";
import { useModal } from "../context/modalContext";

import "./appLayout.styles.css";

export const AppLayout = () => {
  const {closeModal, modals } = useModal();
  return (
    <>
      <main>
        <div className="main-content">
          <Outlet />{" "}
        </div>
      </main>
      {modals.map((modal, index) => (
        <Modal
          key={index} 
          closeModal={() => closeModal(index)}
          className={modal.id} 
        >
          {modal.content}
        </Modal>
      ))}
    </>
  );
};
