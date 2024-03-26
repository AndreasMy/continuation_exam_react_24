/* eslint-disable react/prop-types */
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { makeAPIRequest } from "../../API/apiServices";
import { deleteMuscleGroupAndExercises } from "../../API/apiUtilities";
import { useModal } from "../../context/modalContext";

export const MuscleGroupForms = ({
  group,
  loadMuscleGroups,
  loadExercises,
}) => {
  const { openModal, closeModal } = useModal();

  const handleDeleteMuscleGroup = async (id) => {
    try {
      await deleteMuscleGroupAndExercises(id);
      await loadExercises();
      await loadMuscleGroups();
    } catch (error) {
      console.error("Error deleting muscle group", error);
    }
  };

  const handleEditMuscleGroup = async (musclegroupID) => {
    try {
      const musclegroupObj = await makeAPIRequest("muskelgrupper", {
        method: "GET",
        id: musclegroupID,
      });
      openModal(
        <Forms
          formConfig={workoutForms.musclegroupForms[0]}
          onSubmit={(formData) => submitUpdatedMuscleGroup(formData, musclegroupID)} 
          defaultValues={musclegroupObj}
        />
      );
    } catch (error) {
      console.error("Error", error);
    }
  };

  const submitUpdatedMuscleGroup = async (formData, musclegroupID) => {
    try {
      if (!musclegroupID) {
        console.error("No musclegroup ID is set for editing");
      }

      const currentMuscleGroup = await makeAPIRequest("muskelgrupper", {
        method: "GET",
        id: musclegroupID,
      });

      const updatedMuscleGroup = {
        ...formData,
        ovelser: currentMuscleGroup.ovelser,
      };

      await makeAPIRequest("muskelgrupper", {
        method: "PUT",
        obj: updatedMuscleGroup,
        id: musclegroupID,
      });

      loadMuscleGroups();
      closeModal();
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Wrapper className={"muscle-group-section"}>
      <ul>
        <InteractiveListItem
          onDelete={() => handleDeleteMuscleGroup(group._id)}
          onEdit={() => handleEditMuscleGroup(group._id)}
          tagClassName="musclegroup-category-container"
          tag="h2"
        >
          {group.navn}
        </InteractiveListItem>
      </ul>
    </Wrapper>
  );
};
