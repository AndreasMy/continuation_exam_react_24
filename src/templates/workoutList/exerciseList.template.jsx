/* eslint-disable react/prop-types */
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { deleteExercises } from "../../API/apiUtilities";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { deleteExerciseFromMuscleGroup } from "../../API/apiUtilities";
import { useModal } from "../../context/modalContext";
import { makeAPIRequest } from "../../API/apiServices";
import { Button } from "../../components/button/button.component";

export const ExerciseList = ({ exercisesList, loadExercises }) => {
  const { openModal, closeModal } = useModal();

  const handleDeleteExercise = async (exerciseID) => {
    try {
      await deleteExerciseFromMuscleGroup(exerciseID);
      await deleteExercises(exerciseID);
      await loadExercises();
    } catch (error) {
      console.error("Error deleting muscle Exercise", error);
    }
  };

  const handleEditExercise = async (exerciseID) => {
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
          onSubmit={(formData) => submitUpdatedExercise(formData, exerciseID)}
          defaultValues={selectedExercise}
        />
      );
    } catch (error) {
      console.error("Error fetching exercise details", error);
    }
  };

  const submitUpdatedExercise = async (formData, exerciseId) => {
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

      const updatedFormData = {
        ...formData,
        muskelgruppe: currentExercise.muskelgruppe,
        date: currentExercise.date,
      };

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
          <li key={exercise._id} className="list-item">
            <div className="list-item-content">
              <div className="exercise-info">
                <p>{exercise.name}</p>
              </div>
              <div className="exercise-info">
                <p>Weight: {exercise.weight}</p>
              </div>
              <div className="exercise-info">
                <p>Repetitions: {exercise.repetitions}</p>
              </div>
              <div className="exercise-info">
                <p>Sets: {exercise.sets}</p>
              </div>
              <div className="exercise-info">
                <p>Date: {exercise.date}</p>
              </div>
              <div className="list-item-btn-container">
                <Button
                  className="list-btn delete-btn"
                  onClick={() => handleDeleteExercise(exercise._id)}
                >
                  Delete
                </Button>
                <Button
                  className="list-btn edit-btn"
                  onClick={() => handleEditExercise(exercise._id)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};
