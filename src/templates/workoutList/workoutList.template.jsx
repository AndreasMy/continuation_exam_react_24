/* eslint-disable react/prop-types */
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";

export const ExerciseList = ({ exercisesList }) => {
  return (
    <Wrapper className={"exercise-list"}>
      <h2>List of registered workouts...</h2>
      <ul>
        {exercisesList.map((exercise) => (
          <InteractiveListItem key={exercise._id}>
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
