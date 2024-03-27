import "./workoutCard.styles.css";
import * as React from "react";

import { format } from "date-fns";
import { useFetchList } from "../../API/useFetchList";
import { MuscleGroupForms } from "../../templates/musclegroupForms/musclegroupForms.template";
import { ExerciseList } from "../../templates/exerciseList/exerciseList.template";
import { ExerciseForms } from "../../templates/exerciseForms/exerciseForms.template";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Button } from "../../components/button/button.component";
import { submitForm } from "../../helpers/formHelpers";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { useModal } from "../../context/modalContext";
import { useState, useEffect } from "react";

import { Heading } from "../../components/heading/heading.component";

export const WorkoutCard = ({ selectedDate }) => {
  const { openModal, closeModal, setMuscleGroupID, musclegroupID } = useModal();
  const [musclegroupSelected, setMuscleGroupSelected] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);

  const { list: musclegroups, loadList: loadMuscleGroups } =
    useFetchList("musclegroups");
  const { list: exercisesList, loadList: loadExercises } =
    useFetchList("exercises");

  useEffect(() => {
    loadMuscleGroups();
    loadExercises();
  }, [loadMuscleGroups, loadExercises]);

  const handleMuscleGroupFormSubmit = async (FormData) => {
    await submitForm(
      FormData,
      workoutForms.musclegroupForms[0],
      "musclegroups",
      { exercises: [] },
      loadMuscleGroups
    );
    closeModal()
    setIsClicked(false);
  };

  const handleAddMuscleGroupButton = () => {
    openModal(
      <Forms
        onSubmit={(formData) => handleMuscleGroupFormSubmit(formData)}
        onCancel={closeModal}
        formConfig={workoutForms.musclegroupForms[0]}
      />
    );
  };

  const handleSelectMuscleGroupItem = (group) => {
    setMuscleGroupSelected(true);
    setMuscleGroupID(group._id);
    setSelectedMuscleGroup(group.name);
  };

  const filterExercisesByMuscleGroup = (musclegroupID) => {
    const filteredExercises = exercisesList.filter(
      (exercise) =>
        exercise.musclegroup === musclegroupID && exercise.date === selectedDate
    );
    return filteredExercises;
  };

  return (
    <Wrapper className="workout-card-large">
      <Heading as="h1">{format(new Date(selectedDate), "EEEE MMMM d")}</Heading>
      <div className="line"></div>
      {musclegroups.map((group) => (
        <div key={group._id} className="workout-card-category-item">
          <MuscleGroupForms
            group={group}
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
                <ExerciseForms
                  musclegroupSelected={true}
                  musclegroupID={group._id}
                  loadExercises={loadExercises}
                />
              )
            }
          >
            New Exercise
          </Button>
          <div className="line"></div>
        </div>
      ))}
      <Button className="add-btn" onClick={handleAddMuscleGroupButton}>
        Add Muscle Group
      </Button>
    </Wrapper>
  );
};
