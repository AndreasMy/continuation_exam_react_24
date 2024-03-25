import * as React from "react";
import { useEffect } from "react";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { WorkoutCard } from "../../molecules/workoutCard/workoutCard.molecules";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { Calendar } from "../../components/calendar/calendar.component";
import { useWorkoutContext } from "../../context/workoutContext";
import { useLocation } from "react-router-dom";
import { groupExercisesByDate } from "../../helpers/dateHelpers";

import "./workout.styles.css";

export const WorkoutPage = () => {
  const {
    selectedDate,
    setSelectedDate,
    storedExerciseGroup,
    setStoredExerciseGroup,
    isAddingWorkout,
    setIsAddingWorkout,
    handleSelectDate,
    handleDateSelect,
    handleClickEntryCard,
  } = useWorkoutContext();

  let location = useLocation();

  useEffect(() => {
    if (location.state?.selectedDate) {
      setSelectedDate(location.state.selectedDate);
      setIsAddingWorkout(true);
    }
  }, [location, setSelectedDate, setIsAddingWorkout]);

  return (
    <>
      <Wrapper className="page-content-wrapper">
        <div className="section-wrapper home-welcome-wrapper">
          <div className="section-banner welcome-banner"></div>
          <div className="section-container">
            {isAddingWorkout ? (
              <WorkoutCard
                selectedDate={selectedDate}
                setIsAddingWorkout={setIsAddingWorkout}
                setStoredExerciseGroup={setStoredExerciseGroup}
              />
            ) : (
              <Wrapper className="entry-wrapper">
                <div className="entry-container">
                  <Calendar
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    storedExerciseGroup={storedExerciseGroup}
                  />
                 {/*  <Wrapper className="session-cards-wrapper"> 
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
                  </Wrapper> */}
{/*                   <Forms
                    onSubmit={handleSelectDate}
                    formConfig={workoutForms.workoutForm[0]}
                  ></Forms> */}
                </div>
              </Wrapper>
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
};
