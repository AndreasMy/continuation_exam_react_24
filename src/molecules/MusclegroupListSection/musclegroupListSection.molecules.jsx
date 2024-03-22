/* eslint-disable react/prop-types */
import  './MusclegroupListSection.styles.css'
import { Button } from "../../components/button/button.component";
import { InteractiveListItem } from "../InteractiveListItem/InteractiveListItem.molecule";

export const MusclegroupListSection = ({
  group,
  onDelete,
  onEdit,
  onSelect,
}) => {
  return (
    <>
      <li onClick={onSelect} className="list-item">
      {group.navn}
        <div className="list-item-btn-container">
          <Button className="list-btn delete-btn" onClick={onDelete}>
            Delete
          </Button>
          <Button className="list-btn edit-btn" onClick={onEdit}>
            Edit
          </Button>
        </div>
      </li>
      <div className="line"></div>
    </>
  );
};

