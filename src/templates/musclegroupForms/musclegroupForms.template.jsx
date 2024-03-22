/* eslint-disable react/prop-types */
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Button } from "../../components/button/button.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { Modal } from "../../components/modal/modal.component";

export const MuscleGroupSection = ({
  musclegroups,
  currentMuscleGroup,
  handleSelectMuscleGroupItem,
  handleEditMuscleGroup,
  handleDeleteMuscleGroup,
  handleEditMuscleGroupFormSubmit,
  isModalOpen,
  handleModalCloseMG,
  group
}) => {
  return (
    <Wrapper className={"muscle-group-section"}>
      <ul className="muscle-group-list">
        <InteractiveListItem
          onSelect={() => handleSelectMuscleGroupItem(group)}
          onEdit={() => handleEditMuscleGroup(group._id)}
          onDelete={() => handleDeleteMuscleGroup(group._id)}
        >
          {group.navn}
        </InteractiveListItem>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleModalCloseMG}>
            <Forms
              formConfig={workoutForms.musclegroupForms[0]}
              onSubmit={handleEditMuscleGroupFormSubmit}
              defaultValues={currentMuscleGroup}
            />
          </Modal>
        )}
      </ul>
    </Wrapper>
  );
};
