/* eslint-disable react/prop-types */
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { makeAPIRequest } from "../../API/apiServices";
import { deleteMuscleGroupAndExercises } from "../../API/apiUtilities";
import { useModal } from "../../context/modalContext";
import { Button } from "../../components/button/button.component";
import { ModalConfirm } from "../../components/modalConfirm/modalConfirm.component";

export const MuscleGroupForms = ({
  group,
  loadMuscleGroups,
  loadExercises,
}) => {
  const { openModal, closeModal } = useModal();

  const handleDeleteMuscleGroup = (id, event) => {
    const confirmDeletion = async () => {
      try {
        await deleteMuscleGroupAndExercises(id);
        await loadExercises();
        await loadMuscleGroups();
        closeModal();
      } catch (error) {
        console.error("Error deleting muscle group", error);
      }
    };

    openModal(
      <ModalConfirm
        onConfirm={() => confirmDeletion()}
        onCancel={() => closeModal()}
      />
    );
  };

  const handleEditMuscleGroup = async (musclegroupID) => {
    try {
      const musclegroupObj = await makeAPIRequest("musclegroups", {
        method: "GET",
        id: musclegroupID,
      });
      openModal(
        <Forms
          formConfig={workoutForms.musclegroupForms[0]}
          onSubmit={(formData) =>
            submitUpdatedMuscleGroup(formData, musclegroupID)
          }
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

      const currentMuscleGroup = await makeAPIRequest("musclegroups", {
        method: "GET",
        id: musclegroupID,
      });

      const updatedMuscleGroup = {
        ...formData,
        exercises: currentMuscleGroup.exercises,
      };

      await makeAPIRequest("musclegroups", {
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
        <li className="musclegroup-list">
          <div className="muscle-group-list-item">
            <h3>{group.name}:</h3>
            <div className="list-item-btn-container">
              <Button
                className="list-btn delete-btn"
                onClick={() => handleDeleteMuscleGroup(group._id)}
              >
                Delete
              </Button>
              <Button
                className="list-btn edit-btn"
                onClick={() => handleEditMuscleGroup(group._id)}
              >
                Edit
              </Button>
            </div>
          </div>
        </li>
      </ul>
    </Wrapper>
  );
};
