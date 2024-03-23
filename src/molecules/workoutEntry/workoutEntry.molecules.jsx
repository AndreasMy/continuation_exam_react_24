import "./workoutEntry.styles.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { useFetchList } from "../../API/useFetchList";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Button } from "../../components/button/button.component";

import { MuscleGroupSection } from "../../templates/musclegroupForms/musclegroupForms.template";
import { ExerciseSection } from "../../templates/exerciseForms/exerciseForms.template";
import { useModal } from "../../context/modalContext";

export const WorkoutEntry = () => {
  const { openModal, setMuscleGroupID, musclegroupID } = useModal();
  const [musclegroupSelected, setMuscleGroupSelected] = useState(false);
/*   const [musclegroupID, setMuscleGroupID] = useState(""); */
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);

  const { list: musclegroups, loadList: loadMuscleGroups } =
    useFetchList("muskelgrupper");
  const { list: exercisesList, loadList: loadExercises } =
    useFetchList("ovelser");

  useEffect(() => {
    loadMuscleGroups();
    loadExercises();
  }, [loadMuscleGroups, loadExercises]);


  return (
    <>
      <Wrapper className="workout-entry-wrapper">
        <Wrapper className="left" isContainer={true}>
          {/* Make this a component? */}
          <div className="workout-card-large">
            <div className="card-upper-content">
              <div className="workout-card-date-content">
                {/* Selected date and day is shown here */}
                <h1>Monday April 1st</h1>
              </div>
              <div className="workout-card-main-content">
                <h3>Chest</h3>
                <div className="line"></div>
                <Button>Add Exercise</Button>
                <h3>Arms</h3>
                <div className="line"></div>
                <Button>Add Exercise</Button>
                <h3>Core</h3>
                <div className="line"></div>
                <Button>Add Exercise</Button>
                <h3>Back</h3>
                <div className="line"></div>
                <Button>Add Exercise</Button>
                <h3>Legs</h3>
                <div className="line"></div>
                <Button>Add Exercise</Button>
                {/* Component that renders a muscle group */}
              </div>
            </div>
            <div className="workout-card-button-wrapper">
              <div className="workout-card-button-container">
                <Button>Cancel</Button>
                <Button>Submit</Button>
              </div>
              {/* Cancel and submit buttons */}
            </div>
          </div>
        </Wrapper>
        <Wrapper className="right" isContainer={true}>
        <Wrapper className="modal-forms" >
              <MuscleGroupSection
                setMuscleGroupSelected={setMuscleGroupSelected}
                setMuscleGroupID={setMuscleGroupID}
                musclegroupID={musclegroupID}
                setSelectedMuscleGroup={setSelectedMuscleGroup}
                selectedMuscleGroup={selectedMuscleGroup}
                musclegroups={musclegroups}
                loadMuscleGroups={loadMuscleGroups}
                loadExercises={loadExercises}
              />

              <ExerciseSection
                musclegroupSelected={musclegroupSelected}
                musclegroupID={musclegroupID}
                selectedMuscleGroup={selectedMuscleGroup}
                exercisesList={exercisesList}
                loadExercises={loadExercises}
              />

{/*               <ExerciseList
                exercisesList={exercisesList}
                loadExercises={loadExercises}
              /> */}
            </Wrapper>
        </Wrapper>
      </Wrapper>
    </>
  );
};
