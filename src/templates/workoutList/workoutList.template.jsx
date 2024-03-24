/* eslint-disable react/prop-types */
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { deleteExercises } from "../../API/apiUtilities";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { deleteExerciseFromMuscleGroup } from "../../API/apiUtilities";
import { useModal } from "../../context/modalContext";
import { makeAPIRequest } from "../../API/apiServices";

export const ExerciseList = ({ exercisesList, loadExercises }) => {
  const { openModal, closeModal,} = useModal();

  const handleDelete = async (exerciseID) => {
    try {
      await deleteExerciseFromMuscleGroup(exerciseID);
      await deleteExercises(exerciseID);
      await loadExercises();
    } catch (error) {
      console.error("Error deleting muscle Exercise", error);
    }
  };

  const handleEdit = async (exerciseID) => {
    console.log(exerciseID);
    try {
      const selectedExercise = await makeAPIRequest("ovelser", {
        method: "GET",
        id: exerciseID,
      });
      console.log(selectedExercise);
      openModal(
        <Forms
          formConfig={workoutForms.exerciseForms[0]}
          onSubmit={(formData) => handleEditFormSubmit(formData, exerciseID)}
          defaultValues={selectedExercise}
        />
      );
    } catch (error) {
      console.error("Error fetching exercise details", error);
    }
  };

  const handleEditFormSubmit = async (formData, exerciseId) => {
    console.log(exerciseId);
    try {
      if (!exerciseId) {
        console.error("No exercise ID is set for editing.");
        return;
      }

      const currentExercise = await makeAPIRequest("ovelser", {
        method: "GET",
        id: exerciseId,
      });

      console.log("currentExercise: ", currentExercise);

      const updatedFormData = {
        ...formData,
        muskelgruppe: currentExercise.muskelgruppe, 
        date: currentExercise.date,
      };
      console.log("updatedFormData: ", updatedFormData);

      await makeAPIRequest("ovelser", {
        method: "PUT",
        obj: updatedFormData,
        id: exerciseId,
      });
      loadExercises();
      closeModal(); 
    } catch (error) {
      console.error("Error submitting edited form", error);
    }
  };

  return (
    <Wrapper className={"exercise-list"}>
      <ul>
        {exercisesList.map((exercise) => (
          <InteractiveListItem
            key={exercise._id}
            onDelete={() => handleDelete(exercise._id)}
            onEdit={() => handleEdit(exercise._id)}
          >
            <p>{exercise.name}</p>
            <p>Wheight: {exercise.weight}</p>
            <p>Repetitions: {exercise.repetitions}</p>
            <p>Sets: {exercise.sets}</p>
            <p>Dato: {exercise.date}</p>
          </InteractiveListItem>
        ))}
      </ul>
    </Wrapper>
  );
};
