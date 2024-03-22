/* eslint-disable react/prop-types */

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { Modal } from "../../components/modal/modal.component";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";

export const ExerciseList = ({
  exercisesList,
  isModalOpen,
  currentExercise,
  handleDeleteExercise,
  handleEditExercise,
  handleModalCloseEX,
  handleEditExerciseFormSubmit,

}) => {
  return (
    <Wrapper className={"exercise-list"}>
      <ul>
        {exercisesList.map((exercise) => (
          <InteractiveListItem
            key={exercise._id}
            onDelete={() => handleDeleteExercise(exercise._id)}
            onEdit={() => handleEditExercise(exercise._id)}
          >
            <p>{exercise.name}</p>
            <p>Wheight: {exercise.weight}</p>
            <p>Repetitions: {exercise.repetitions}</p>
            <p>Sets: {exercise.sets}</p>
            {/* <p>Dato: {exercise.date}</p> */}
          </InteractiveListItem>
        ))}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleModalCloseEX}>
            <Forms
              formConfig={workoutForms.exerciseForms[0]}
              onSubmit={handleEditExerciseFormSubmit}
              defaultValues={currentExercise}
            />
          </Modal>
        )}
      </ul>
    </Wrapper>
  );
};
