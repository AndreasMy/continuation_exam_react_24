import "./modalConfirm.styles.css";
import { Button } from "../button/button.component";
import { Wrapper } from "../wrapper/wrapper.component";

export const ModalConfirm = ({ onConfirm, onCancel }) => {
  return (
    <Wrapper className="confirm-modal-container">
      <h2>Are you sure?</h2>
      <p>This action cannot be undone!</p>
      <div className="confirm-modal-button-container">
        <Button className="modal-confirm-button" onClick={onConfirm}>
          Yes, delete it
        </Button>
        <Button className="cancel-button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Wrapper>
  );
};
