/* eslint-disable react/prop-types */
import { Button } from "../../components/button/button.component";

export const InteractiveListItem = ({ children, onDelete, onEdit, onSelect }) => {
  return (
    <li onClick={onSelect} className="list-item">
      {children}
      <div className="list-item-btn-container">
        <Button className="list-btn delete-btn" onClick={onDelete}>
          Delete
        </Button>
        <Button className="list-btn edit-btn" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </li>
  );
};


