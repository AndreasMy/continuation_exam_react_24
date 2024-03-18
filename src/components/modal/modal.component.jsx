import { Button } from "../button/button.component";
import './modal.styles.css'

export const Modal = ({ isOpen, onClose, children, className }) => {
  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div
        className={`modal-container ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button className="modal-close-button" onClick={onClose}>
          X
        </Button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
