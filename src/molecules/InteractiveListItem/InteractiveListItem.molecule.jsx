/* eslint-disable react/prop-types */
import { Button } from "../../components/button/button.component";

export const InteractiveListItem = ({
  children,
  onDelete,
  onEdit,
  onSelect,
  listClassName,
  listContainerClassName,
  tag: Tag = 'div',
  tagClassName = "",
}) => {
  return (
    <li onClick={onSelect} className={`list-item ${listClassName || ""}`}>
      <div className={`list-item-content ${listContainerClassName || ""}`}>
      <Tag className={tagClassName}>
         {children}
        </Tag> 
        <div className="list-item-btn-container">
          <Button className="list-btn delete-btn" onClick={onDelete}>
            Delete
          </Button>
          <Button className="list-btn edit-btn" onClick={onEdit}>
            Edit
          </Button>
        </div>
      </div>
    </li>
  );
};
