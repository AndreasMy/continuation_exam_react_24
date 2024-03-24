import * as React from "react";
import { useState, useEffect } from "react";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { WorkoutCard } from "../../molecules/workoutCard/workoutCard.molecules";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { useFetchList } from "../../API/useFetchList";
import { Button } from "../../components/button/button.component";

import { groupExercisesByDate } from "../../helpers/dateHelpers";

import "./workout.styles.css";

export const WorkoutPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [storedExerciseGroup, setStoredExerciseGroup] = useState([]);

  const { list: exercisesList, loadList: loadExercises } =
    useFetchList("ovelser");

  useEffect(() => {
    loadExercises();
  }, [loadExercises]); // Ensures loadExercises is called once on mount.

  useEffect(() => {
    // This useEffect now correctly waits for exercisesList to be updated by the first useEffect.
    const groupedExercises = groupExercisesByDate(exercisesList);
    setStoredExerciseGroup(groupedExercises);
  }, [exercisesList]);

  console.log(storedExerciseGroup); // empty object

  const logGroupedItems = () => {
    const groupedExercises = groupExercisesByDate(exercisesList);
    console.log(groupedExercises);
  };

  const handleSelectDate = (formData) => {
    const dateFromForm = formData["date"];
    setSelectedDate(dateFromForm);

    
    setIsAddingWorkout(true);
  };

  return (
    <>
      <Wrapper className="page-content-wrapper">
        <div className="section-wrapper home-welcome-wrapper">
          <div className="section-banner welcome-banner"></div>
          <div className="section-container">
            <h1>Add Workout</h1>
            {isAddingWorkout ? (
              <WorkoutCard
                selectedDate={selectedDate}
                setIsAddingWorkout={setIsAddingWorkout}
                setStoredExerciseGroup={setStoredExerciseGroup}
              />
            ) : (
              <Wrapper className="entry-wrapper">
                <div className="entry-container">
                  <Wrapper className="session-cards-wrapper">
                    {Array.isArray(storedExerciseGroup) &&
                      storedExerciseGroup.map((session) => (
                        <div key={session.date} className="session-card">
                          <h4>{session.date}</h4>
                          <ul>
                            {session.exercises.map((exercise) => (
                              <li key={exercise._id}>
                                <p>Name: {exercise.name}</p>
                                <p>Repetitions: {exercise.repetitions}</p>
                                <p>Sets: {exercise.sets}</p>
                                <p>Weight: {exercise.weight}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </Wrapper>

                  <Forms
                    onSubmit={handleSelectDate}
                    formConfig={workoutForms.workoutForm[0]}
                  ></Forms>
                </div>
              </Wrapper>
            )}
          </div>
          <Button onClick={logGroupedItems}>Test Function</Button>
        </div>
      </Wrapper>
    </>
  );
};
