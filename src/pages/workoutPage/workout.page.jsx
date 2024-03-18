import * as React from "react";
import { useState, useEffect } from "react";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { MuscleGroupSection } from "../../templates/musclegroupForms/musclegroupForms.template";
import { ExerciseSection } from "../../templates/exerciseForms/exerciseForms.template";
import { Modal } from "../../components/modal/modal.component";


import { ExerciseList } from "../../templates/workoutList/workoutList.template";
import { useFetchList } from "../../API/useFetchList";

import "./workout.styles.css";

export const WorkoutPage = () => {
  const [musclegroupSelected, setMuscleGroupSelected] = useState(false);
  const [musclegroupID, setMuscleGroupID] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");



  const { list: musclegroups, loadList: loadMuscleGroups } =
    useFetchList("muskelgrupper");
  const { list: exercisesList, loadList: loadExercises } =
    useFetchList("ovelser");

  useEffect(() => {
    loadMuscleGroups();
    loadExercises();
  }, [loadMuscleGroups, loadExercises]);

  const [startDate, setDate] = React.useState(new Date());
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);
  // const today = new Date();

  const selectDateHandler = (date) => {
    setDate(date);
  };

  return (
    <>
      <Wrapper className="page-content-wrapper">
        <div className="section-wrapper home-welcome-wrapper">
          <div className="section-banner welcome-banner"></div>
          <div className="section-container">
            <h1>Add Workout</h1>
            <h4>Select Date</h4>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              onChange={selectDateHandler}
              /* minDate={today} */
              todayButton={"Today"}
            />
            <Wrapper className="ui-wrapper">
              <MuscleGroupSection
                setMuscleGroupSelected={setMuscleGroupSelected}
                setMuscleGroupID={setMuscleGroupID}
                setSelectedMuscleGroup={setSelectedMuscleGroup}
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

              <ExerciseList
                exercisesList={exercisesList}
                loadExercises={loadExercises}
              />
            </Wrapper>
          </div>
        </div>
      </Wrapper>

    </>
  );
};
