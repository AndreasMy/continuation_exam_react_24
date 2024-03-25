import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetchList } from "../API/useFetchList";
import { groupExercisesByDate } from "../helpers/dateHelpers";

const WorkoutContext = createContext();
export const WorkoutProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [storedExerciseGroup, setStoredExerciseGroup] = useState([]);
    const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  
    const { list: exercisesList, loadList: loadExercises } = useFetchList("ovelser");
  
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
      console.log("New selected date:", date);
    };

    const handleClickEntryCard = (session) => {
      setSelectedDate(session.date);
      setIsAddingWorkout(true);
    };
  
    return (
      <WorkoutContext.Provider
        value={{
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
  