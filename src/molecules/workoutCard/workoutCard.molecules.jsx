import "./workoutCard.styles.css";

import * as React from "react";
import { useFetchList } from "../../API/useFetchList";
import { MuscleGroupSection } from "../../templates/musclegroupForms/musclegroupForms.template";
import { ExerciseList } from "../../templates/workoutList/workoutList.template";
import { ExerciseSection } from "../../templates/exerciseForms/exerciseForms.template";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Button } from "../../components/button/button.component";

import { submitForm } from "../../helpers/formHelpers";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { useModal } from "../../context/modalContext";

import { sortExercisesByDate } from "../../helpers/dateHelpers";

import { useState, useEffect } from "react";

export const WorkoutCard = ({ selectedDate, setIsAddingWorkout }) => {
  const { openModal, setMuscleGroupID, musclegroupID } = useModal();

  const [musclegroupSelected, setMuscleGroupSelected] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const { list: musclegroups, loadList: loadMuscleGroups } =
    useFetchList("muskelgrupper");
  const { list: exercisesList, loadList: loadExercises } =
    useFetchList("ovelser");

  useEffect(() => {
    loadMuscleGroups();
    loadExercises();
  }, [loadMuscleGroups, loadExercises]);

  const handleCloseWorkoutCard = () => {
    sortExercisesByDate(exercisesList);
    setIsAddingWorkout(false);
  };

  const handleMuscleGroupFormSubmit = async (FormData) => {
    await submitForm(
      FormData,
      workoutForms.musclegroupForms[0],
      "muskelgrupper",
      { ovelser: [] },
      loadMuscleGroups
    );
    setIsClicked(false);
  };

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  const handleSelectMuscleGroupItem = (group) => {
    setMuscleGroupSelected(true);
    setMuscleGroupID(group._id);
    setSelectedMuscleGroup(group.navn);
  };

  const filterExercisesByMuscleGroup = (musclegroupID) => {
    const filteredExercises = exercisesList.filter(
      (exercise) => exercise.muskelgruppe === musclegroupID
    );
    return filteredExercises;
  };

  return (
    <Wrapper className="workout-card-large">
      {musclegroups.map((group) => (
        <div key={group._id} className="workout-card-category-item">
          <MuscleGroupSection
            group={group}
            setMuscleGroupSelected={setMuscleGroupSelected}
            setMuscleGroupID={setMuscleGroupID}
            musclegroupID={musclegroupID}
            setSelectedMuscleGroup={setSelectedMuscleGroup}
            selectedMuscleGroup={selectedMuscleGroup}
            musclegroups={musclegroups}
            loadMuscleGroups={loadMuscleGroups}
            loadExercises={loadExercises}
            handleSelectMuscleGroupItem={handleSelectMuscleGroupItem}
          />
          <ExerciseList
            exercisesList={filterExercisesByMuscleGroup(group._id)}
            loadExercises={loadExercises}
            musclegroupSelected={musclegroupSelected}
            musclegroupID={musclegroupID}
            selectedMuscleGroup={selectedMuscleGroup}
          />
          <Button
            className="add-exercise-button"
            onClick={() =>
              openModal(
                <ExerciseSection
                  musclegroupSelected={true}
                  musclegroupID={group._id}
                  loadExercises={loadExercises}
                  selectedDate={selectedDate}
                />
              )
            }
          >
            Add Exercise
          </Button>
          <div className="line"></div>
        </div>
      ))}
      {isClicked ? (
        <Forms
          onSubmit={(formData) => handleMuscleGroupFormSubmit(formData)}
          formConfig={workoutForms.musclegroupForms[0]}
        />
      ) : (
        <Button className="add-btn" onClick={handleButtonClick}>
          Add a muscle group..
        </Button>
      )}
      <Button onClick={handleCloseWorkoutCard}>Done</Button>
    </Wrapper>
  );
};
