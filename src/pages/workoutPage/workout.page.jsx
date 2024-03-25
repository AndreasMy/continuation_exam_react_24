import * as React from "react";
import { useState, useEffect } from "react";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { WorkoutCard } from "../../molecules/workoutCard/workoutCard.molecules";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { useFetchList } from "../../API/useFetchList";

import { Calendar } from "../../components/calendar/calendar.component";

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
  }, [loadExercises]);

  useEffect(() => {
    const groupedExercises = groupExercisesByDate(exercisesList);
    setStoredExerciseGroup(groupedExercises);
  }, [exercisesList]);

  const handleSelectDate = (formData) => {
    const dateFromForm = formData["date"];
    setSelectedDate(dateFromForm);
    setIsAddingWorkout(true);
  };

  const handleClickEntryCard = (session) => {
    setSelectedDate(session.date);
    console.log(session.date);
    setIsAddingWorkout(true)

  };

  return (
    <>
      <Wrapper className="page-content-wrapper">
        <div className="section-wrapper home-welcome-wrapper">
          <div className="section-banner welcome-banner"></div>
          <div className="section-container">
            <Calendar />
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
                        <div
                          key={session.date}
                          className="session-card"
                          onClick={() => handleClickEntryCard(session)}
                        >
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
        </div>
      </Wrapper>
    </>
  );
};
