/* eslint-disable react/prop-types */

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { useModal } from "../../context/modalContext";

export const ExerciseList = ({ exercisesList, handleDeleteExercise }) => {
  const { setupEditExerciseModal } = useModal();

  const handleEditButtonClick = (exerciseId) => {
    setupEditExerciseModal(exerciseId);
  };

  return (
    <ul className="exercise-list-ul">
      {exercisesList.map((exercise) => (
        <InteractiveListItem
          key={exercise._id}
          onDelete={() => handleDeleteExercise(exercise._id)}
          onEdit={() => handleEditButtonClick(exercise._id)}
        >
          <p>{exercise.name}</p>
          <p>Wheight: {exercise.weight}</p>
          <p>Repetitions: {exercise.repetitions}</p>
          <p>Sets: {exercise.sets}</p>
          {/* <p>Dato: {exercise.date}</p> */}
        </InteractiveListItem>
      ))}
    </ul>
  );
};
