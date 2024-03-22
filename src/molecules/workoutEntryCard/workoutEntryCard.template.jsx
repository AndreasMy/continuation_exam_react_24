import "./workoutEntryCard.styles.css";

import { MuscleGroupSection } from "../../templates/musclegroupForms/musclegroupForms.template";
import { ExerciseList } from "../../templates/workoutList/workoutList.template";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Button } from "../../components/button/button.component";
import { ExerciseSection } from "../../templates/exerciseForms/exerciseForms.template";

export const WorkoutEntryCard = ({
  musclegroups = [],
  loadMuscleGroups,
  setMuscleGroupID,
  setMuscleGroupSelected,
  musclegroupID, //! Greyed out?
  setSelectedMuscleGroup,
  loadExercises,
  exercisesList,
  musclegroupSelected,
  isModalOpen,
  isClicked,
  handleButtonClick,
  currentExercise,
  currentMuscleGroup,
  handleSelectMuscleGroupItem,
  handleEditMuscleGroup,
  handleDeleteMuscleGroup,
  handleEditMuscleGroupFormSubmit,
  handleMuscleGroupFormSubmit,
  handleEditExercise,
  handleDeleteExercise,
  handleModalCloseEX,
  handleEditExerciseFormSubmit,
  handleModalCloseMG,
}) => {
  const filterExercisesByMuscleGroup = (musclegroupID) => {
    console.log("Filtering exercises for muscle group:", musclegroupID);
    const filteredExercises = exercisesList.filter(
      (exercise) => exercise.musclegroupId === musclegroupID
    );
    console.log("Filtered exercises:", filteredExercises);
    return filteredExercises;
  };

  console.log(musclegroups);
  console.log(exercisesList);

  return (
    <Wrapper className="workout-card-large">
      {musclegroups.map((group) => (
        <div key={group._id}>
          <MuscleGroupSection
            group={group}
            setMuscleGroupID={setMuscleGroupID}
            setMuscleGroupSelected={setMuscleGroupSelected}
            setSelectedMuscleGroup={setSelectedMuscleGroup}
            loadMuscleGroups={loadMuscleGroups}
            loadExercises={loadExercises}
            musclegroupSelected={musclegroupSelected}
            isModalOpen={isModalOpen}
            currentMuscleGroup={currentMuscleGroup}
            handleSelectMuscleGroupItem={handleSelectMuscleGroupItem}
            handleEditMuscleGroup={handleEditMuscleGroup}
            handleDeleteMuscleGroup={handleDeleteMuscleGroup}
            handleEditMuscleGroupFormSubmit={handleEditMuscleGroupFormSubmit}
            handleMuscleGroupFormSubmit={handleMuscleGroupFormSubmit}
            handleButtonClick={handleButtonClick}
            isClicked={isClicked}
            handleModalCloseMG={handleModalCloseMG}
            musclegroups={musclegroups}
          />

          <ExerciseList
            exercisesList={filterExercisesByMuscleGroup(group._id)}
            loadExercises={loadExercises}
            isModalOpen={isModalOpen}
            currentExercise={currentExercise}
            handleDeleteExercise={handleDeleteExercise}
            handleEditExercise={handleEditExercise}
            handleModalCloseEX={handleModalCloseEX}
            handleEditExerciseFormSubmit={handleEditExerciseFormSubmit}
          />
        </div>
      ))}
      {isClicked ? (
        <Forms
          onSubmit={handleMuscleGroupFormSubmit}
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
