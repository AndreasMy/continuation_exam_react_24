import "./workoutEntryCard.styles.css";

import { MuscleGroupForms } from "../../templates/musclegroupForms/musclegroupForms.template";
import { ExerciseList } from "../../templates/workoutList/workoutList.template";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Button } from "../../components/button/button.component";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { useModal } from "../../context/modalContext";
import { useState, useEffect } from "react";
import { handleMuscleGroupFormSubmit } from "../../helpers/formLogicHelpers";
import { useWorkout } from "../../context/workoutContext";
import { ExerciseForms } from "../../templates/exerciseForms/exerciseForms.template";
import { handleDeleteExercise } from "../../helpers/formLogicHelpers";

export const WorkoutEntryCard = ({}) => {
  const {
    musclegroupID,
    setMuscleGroupID,
    setSelectedMuscleGroup,
    setMuscleGroupSelected,
    musclegroups,
    loadMuscleGroups,
    exercisesList,
    loadExercises,
    musclegroupSelected,
  } = useWorkout();


  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    loadMuscleGroups();
    loadExercises();
  }, [loadMuscleGroups, loadExercises]);

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  const handleSelectMuscleGroupItem = (group) => {
    console.log(group);
    setMuscleGroupSelected(true);
    setMuscleGroupID(group._id);
    console.log(musclegroupID); // is logged
    setSelectedMuscleGroup(group.navn);
  };

  const filterExercisesByMuscleGroup = (musclegroupID) => {
    console.log("Current musclegroupID for filtering:", musclegroupID);
    const filteredExercises = exercisesList.filter(
      (exercise) => exercise.muskelgruppe === musclegroupID
    );
    console.log("Filtered exercises:", filteredExercises); // returns empty array
    return filteredExercises;
  };

  const { openModal } = useModal();

  return (
    <Wrapper className="workout-card-large">
      {musclegroups.map((group) => (
        <div key={group._id} className="workout-card-category-item">
          <MuscleGroupForms
            loadMuscleGroups={loadMuscleGroups}
            loadExercises={loadExercises}
            group={group}
            handleSelectMuscleGroupItem={handleSelectMuscleGroupItem}
          />
          <ExerciseList
            exercisesList={filterExercisesByMuscleGroup(group._id)}
            handleDeleteExercise={handleDeleteExercise}
            loadExercises={loadExercises}
          />
          <Button className="add-exercise-button"
            onClick={() =>
              openModal(
                <ExerciseForms
                musclegroupSelected={musclegroupSelected}
                musclegroupID={musclegroupID}
                loadExercises={loadExercises}
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
          onSubmit={(formData) =>
            handleMuscleGroupFormSubmit(formData, {
              loadMuscleGroups,
              setIsClicked,
            })
          }
          formConfig={workoutForms.musclegroupForms[0]}
        />
      ) : (
        <Button className="add-btn" onClick={handleButtonClick}>
          Add a muscle group..
        </Button>
      )}
    </Wrapper>
  );
};
