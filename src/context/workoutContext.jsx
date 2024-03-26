import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetchList } from "../API/useFetchList";
import { useModal } from "./modalContext";
import { groupExercisesByDate } from "../helpers/dateHelpers";
import { WorkoutCard } from "../molecules/workoutCard/workoutCard.molecules";

const WorkoutContext = createContext();
export const WorkoutProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [storedExerciseGroup, setStoredExerciseGroup] = useState([]);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);

  const { list: exercisesList, loadList: loadExercises } =
    useFetchList("ovelser");

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  useEffect(() => {
    if (exercisesList) {
      const groupedExercises = groupExercisesByDate(exercisesList);
      setStoredExerciseGroup(groupedExercises);
    }
  }, [exercisesList, selectedDate]);

  const handleSelectDate = (formData) => {
    const dateFromForm = formData["date"];
    setSelectedDate(dateFromForm);
    setIsAddingWorkout(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsAddingWorkout(true);
    console.log(selectedDate);
  };

  const handleClickEntryCard = (session) => {
    setSelectedDate(session.date);
    setIsAddingWorkout(true);
  };

  return (
    <WorkoutContext.Provider
      value={{
        exercisesList,
        loadExercises,
        selectedDate,
        setSelectedDate,
        storedExerciseGroup,
        setStoredExerciseGroup,
        isAddingWorkout,
        setIsAddingWorkout,
        handleSelectDate,
        handleDateSelect,
        handleClickEntryCard,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => useContext(WorkoutContext);
