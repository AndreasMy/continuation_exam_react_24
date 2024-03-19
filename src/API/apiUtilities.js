import { makeAPIRequest } from "./apiServices";

export const populateMuscleGroupArray = async (exerciseID, muscleGroupID) => {
  try {
    const muscleGroup = await makeAPIRequest("muskelgrupper", {
      method: "GET",
      id: muscleGroupID,
    });
    if (muscleGroup) {
      const updatedMG = {
        navn: muscleGroup.navn,
        ovelser: [...muscleGroup.ovelser, exerciseID],
      };
      await makeAPIRequest("muskelgrupper", {
        method: "PUT",
        obj: updatedMG,
        id: muscleGroupID,
      });
    }
  } catch (error) {
    console.error("Error updating muscle group", error);
  }
};

export const deleteExerciseSingle = async (exerciseID) => {
  try {
    await makeAPIRequest("ovelser", { method: "DELETE", id: exerciseID });
  } catch (error) {
    console.error("Error deleting exercise", error);
    throw error;
  }
};

export const deleteExercises = async (exerciseIDs) => {
  try {
    for (const id of exerciseIDs) {
      await makeAPIRequest("ovelser", { method: "DELETE", id: id });
    }
  } catch (error) {
    console.error("Error deleting exercise", error);
    throw error;
  }
};

export const fetchExercisesByMuscleGroupID = async (musclegroupID) => {
  try {
    const data = await makeAPIRequest("muskelgrupper", {
      method: "GET",
      id: musclegroupID,
    });
    const arrayData = [...data.ovelser];
    return arrayData;
  } catch (error) {
    console.error("Error finding array items", error);
  }
};

export const deleteMuscleGroupAndExercises = async (musclegroupID) => {
  try {
    const exerciseIDs = await fetchExercisesByMuscleGroupID(musclegroupID);
    if (exerciseIDs.length) {
      await deleteExercises(exerciseIDs);
    }
    await makeAPIRequest("muskelgrupper", {
      method: "DELETE",
      id: musclegroupID,
    });
  } catch (error) {
    console.error("Error deleting muscle group and its exercises", error);
  }
};
