/* eslint-disable react/prop-types */
import { useState } from "react";
import { DELETERequest } from "../../API/apiServices";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { deleteExerciseSingle } from "../../API/apiUtilities";

export const ExerciseList = ({ exercisesList, loadExercises }) => {
  
  const handleDelete = async (exerciseID) => {
    try {
      await deleteExerciseSingle(exerciseID)
      await loadExercises();
    } catch (error) {
      console.error("Error deleting muscle Exercise", error);
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
          >
            <p>{exercise.name}</p>
            <p>Vekt: {exercise.weight}</p>
            <p>Repetisjoner: {exercise.repetitions}</p>
            <p>Sett: {exercise.sets}</p>
            <p>Dato: {exercise.date}</p>
          </InteractiveListItem>
        ))}
      </ul>
    </Wrapper>
  );
};
