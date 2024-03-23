import React, { createContext, useContext, useState } from "react";
import { useFetchList } from "../API/useFetchList";

const WorkoutContext = createContext();

export const useWorkout = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {

  const { list: musclegroups, loadList: loadMuscleGroups } =
    useFetchList("muskelgrupper");
  const { list: exercisesList, loadList: loadExercises } =
    useFetchList("ovelser");

  const [musclegroupID, setMuscleGroupID] = useState("");
  const [musclegroupSelected, setMuscleGroupSelected] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const [currentMuscleGroup, setCurrentMuscleGroup] = useState({});

  const [currentExercise, setCurrentExercise] = useState({});
  const [currentExerciseId, setCurrentExerciseId] = useState(null);
  return (
    <WorkoutContext.Provider
      value={{
        musclegroupID,
        setMuscleGroupID,
        musclegroupSelected,
        setMuscleGroupSelected,
        selectedMuscleGroup,
        setSelectedMuscleGroup,
        currentMuscleGroup,
        setCurrentMuscleGroup,
        currentExercise,
        setCurrentExercise,
        currentExerciseId,
        setCurrentExerciseId,
        musclegroups,
        loadMuscleGroups,
        exercisesList,
        loadExercises
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
