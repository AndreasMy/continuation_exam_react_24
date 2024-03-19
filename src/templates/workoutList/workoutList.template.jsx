/* eslint-disable react/prop-types */
import { useState } from "react";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { deleteExercises } from "../../API/apiUtilities";
import { Modal } from "../../components/modal/modal.component";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { deleteExerciseFromMuscleGroup } from "../../API/apiUtilities";

import { makeAPIRequest } from "../../API/apiServices";
import { format, set } from "date-fns";

export const ExerciseList = ({ exercisesList, loadExercises }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState({});
  const [currentExerciseId, setCurrentExerciseId] = useState(null);

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
    try {
      const selectedExercise = await makeAPIRequest("ovelser", {
        method: "GET",
        id: exerciseID,
      });
      setCurrentExerciseId(exerciseID);
      setCurrentExercise(selectedExercise);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching exercise details", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentExerciseId(null);
    setCurrentExercise({});
  };

  const handleEditFormSubmit = async (formData) => {
    try {
      if (!currentExerciseId) {
        console.error("No exercise ID is set for editing.");
        return;
      }
      await makeAPIRequest("ovelser", {
        method: "PUT",
        obj: formData,
        id: currentExerciseId,
      });
      loadExercises();
      setIsModalOpen(false);
      setCurrentExerciseId(null);
    } catch (error) {
      console.error("Error submitting edited form", error);
    }
  };

  return (
    <Wrapper className={"exercise-list"}>
      <h2>List of registered workouts...</h2>
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
            {/* <p>Dato: {exercise.date}</p> */}
          </InteractiveListItem>
        ))}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <Forms
              formConfig={workoutForms.exerciseForms[0]}
              onSubmit={handleEditFormSubmit}
              defaultValues={currentExercise}
            />
          </Modal>
        )}
      </ul>
    </Wrapper>
  );
};
