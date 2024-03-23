import { submitForm } from "./formHelpers";
import { workoutForms } from "../data/workoutForms";
import { makeAPIRequest } from "../API/apiServices";
import {
  deleteExerciseFromMuscleGroup,
  deleteExercises,
  populateMuscleGroupArray,
  deleteMuscleGroupAndExercises,
} from "../API/apiUtilities";

/* const { list: musclegroups, loadList: loadMuscleGroups } =
  useFetchList("muskelgrupper");
const { list: exercisesList, loadList: loadExercises } =
  useFetchList("ovelser"); */

//* MuscleGroups
export const handleMuscleGroupFormSubmit = async (
  FormData,
  { loadMuscleGroups, setIsClicked }
) => {
  await submitForm(
    FormData,
    workoutForms.musclegroupForms[0],
    "muskelgrupper",
    { ovelser: [] },
    loadMuscleGroups
  );
  setIsClicked(false);
};

export const handleEditMuscleGroupFormSubmit = async (
  formData,
  {
    loadMuscleGroups,
    muscleGroupId,
    setIsModalOpen,
    setSelectedMuscleGroup,
    setMuscleGroupID,
  }
) => {
  console.log("Editing musclegroup with ID:", muscleGroupId);
  try {
    if (!muscleGroupId) {
      console.error("No musclegroup ID is set for editing");
    }

    const currentMuscleGroup = await makeAPIRequest("muskelgrupper", {
      method: "GET",
      id: muscleGroupId,
    });

    const updatedMuscleGroup = {
      ...formData,
      ovelser: currentMuscleGroup.ovelser,
    };

    await makeAPIRequest("muskelgrupper", {
      method: "PUT",
      obj: updatedMuscleGroup,
      id: muscleGroupId,
    });

    loadMuscleGroups(); // where to get?
    setIsModalOpen(false);
    setSelectedMuscleGroup(null);
    setMuscleGroupID(null);
  } catch (error) {
    console.error("Error", error);
  }
};

export const handleDeleteMuscleGroup = async (
  id,
  { loadMuscleGroups, loadExercises }
) => {
  try {
    await deleteMuscleGroupAndExercises(id);
    await loadExercises();
    await loadMuscleGroups();
  } catch (error) {
    console.error("Error deleting muscle group", error);
  }
};

//* Exercises
export const handleExerciseFormSubmit = async (
  FormData,
  { musclegroupSelected, musclegroupID, loadExercises }
) => {
  if (musclegroupSelected) {
    await submitForm(
      FormData,
      workoutForms.exerciseForms[0],
      "ovelser",
      { muskelgruppe: musclegroupID },
      async (response) => {
        await populateMuscleGroupArray(response._id, musclegroupID);
        await loadExercises();
      }
    );
  }
};

export const handleEditExerciseFormSubmit = async (
  formData,
  { currentExerciseId, setCurrentExerciseId }
) => {
  try {
    if (!currentExerciseId) {
      console.error("No exercise ID is set for editing.");
      return;
    }
    await makeAPIRequest("ovelser", {
      method: "PUT",
      obj: formData,
      id: currentExerciseId,
    });
    loadExercises();
    setIsModalOpen(false);
    setCurrentExerciseId(null);
  } catch (error) {
    console.error("Error submitting edited form", error);
  }
};

// In helper.js
export const handleDeleteExercise = async (exerciseID, { loadExercises }) => {
  try {
    await deleteExerciseFromMuscleGroup(exerciseID);
    await deleteExercises(exerciseID);
    loadExercises(); // Assuming this is a callback function passed in
  } catch (error) {
    console.error("Error deleting muscle Exercise", error);
  }
};
