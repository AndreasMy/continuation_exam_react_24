import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetchList } from "../API/useFetchList";

import {
  groupExercisesByDate,
} from "../helpers/dateHelpers";

const WorkoutContext = createContext();
export const WorkoutProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [storedExerciseGroup, setStoredExerciseGroup] = useState([]);

  const { list: exercisesList, loadList: loadExercises } =
    useFetchList("exercises");

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
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleClickEntryCard = (session) => {
    setSelectedDate(session.date);
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

        handleSelectDate,
        handleDateSelect,
        handleClickEntryCard,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => useContext(WorkoutContext); // error
