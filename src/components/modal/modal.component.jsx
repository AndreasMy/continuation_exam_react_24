import { Button } from "../button/button.component";
import './modal.styles.css'

export const Modal = ({ isModalOpen, closeModal, children, className }) => {
  return (
    <div className={`modal-overlay ${isModalOpen ? "open" : ""}`}>
      <div
        className={`modal-container ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button className="modal-close-button" onClick={closeModal}>
          X
        </Button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
