import { Button } from "../button/button.component";
import "./modal.styles.css";

export const Modal = ({ closeModal, children, className }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
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
