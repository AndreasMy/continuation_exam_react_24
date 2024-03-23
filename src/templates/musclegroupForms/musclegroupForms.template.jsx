/* eslint-disable react/prop-types */
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { useModal } from "../../context/modalContext";
import { handleDeleteMuscleGroup } from "../../helpers/formLogicHelpers";

export const MuscleGroupForms = ({
  group,
  handleSelectMuscleGroupItem,
  loadMuscleGroups,
  loadExercises,
}) => {
  const { setupEditMuscleGroupModal } = useModal();

  
  return (
    <Wrapper className={"muscle-group-section"}>
      <ul className="muscle-group-list">
        <InteractiveListItem
          onSelect={() => handleSelectMuscleGroupItem(group)}
          onEdit={() => setupEditMuscleGroupModal(group._id)}
          onDelete={() =>
            handleDeleteMuscleGroup(group._id, {
              loadMuscleGroups,
              loadExercises,
            })
          }
        >
          {group.navn}
        </InteractiveListItem>
      </ul>
    </Wrapper>
  );
};
