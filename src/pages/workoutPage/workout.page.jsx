import * as React from "react";
import { useEffect } from "react";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { ExerciseList } from "../../templates/workoutList/workoutList.template";
import { useFetchList } from "../../API/useFetchList";

import { Button } from "../../components/button/button.component";
import { useModal } from "../../context/modalContext";
import { WorkoutEntry } from "../../molecules/workoutEntry/workoutEntry.molecules";

import "./workout.styles.css";

export const WorkoutPage = () => {
  const { loadList: loadMuscleGroups } = useFetchList("muskelgrupper");
  const { list: exercisesList, loadList: loadExercises } =
    useFetchList("ovelser");

  useEffect(() => {
    loadMuscleGroups();
    loadExercises();
  }, [loadMuscleGroups, loadExercises]);

  const { openModal } = useModal();

  return (
    <>
      <Wrapper className="page-content-wrapper">
        <div className="section-wrapper home-welcome-wrapper">
          <div className="section-banner welcome-banner"></div>
          <div className="section-container">
            <h1>Add Workout</h1>
            <Button onClick={() => openModal(<WorkoutEntry />)}>
              Open Exercises From Global Scope
            </Button>
            <ExerciseList
              exercisesList={exercisesList}
              loadExercises={loadExercises}
            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};
