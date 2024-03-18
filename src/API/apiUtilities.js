import {
  DELETERequest,
  fetchWithID,
  POSTRequest,
  PUTRequest,
} from "./apiServices";

export const populateMuscleGroupArray = async (exerciseID, muscleGroupID) => {
  try {
    const muscleGroup = await fetchWithID("muskelgrupper", muscleGroupID); //muscleGroupID
    if (muscleGroup) {
      const updatedMG = {
        navn: muscleGroup.navn,
        ovelser: [...muscleGroup.ovelser, exerciseID],
      };
      await PUTRequest(updatedMG, "muskelgrupper", muscleGroupID);
    }
  } catch (error) {
    console.error("Error updating muscle group", error);
  }
};

// misleading function title
export const findMuscleGroupByID = async (muscleGroupID) => {
  try {
    const data = await fetchWithID("muskelgrupper", muscleGroupID);
    const arrayData = [...data.ovelser];
    return arrayData;
  } catch (error) {
    console.error("Error finding array items", error);
  }
};

export const findMGByID = async (muscleGroupID) => {
  try {
    const data = await fetchWithID("muskelgrupper", muscleGroupID);
    return data;
  } catch (error) {
    console.error("Error finding array items", error);
  }
};

export const editMuscleGroup = async (
  muscleGroupID,
  updatedMuscleGroupData
) => {
  try {
    await PUTRequest(updatedMuscleGroupData, "muskelgrupper", muscleGroupID);
  } catch (error) {
    console.error("Error updating muscle group", error);
  }
};

export const findExerciseByID = async (exerciseID) => {
  try {
    const data = await fetchWithID("ovelser", exerciseID);
    return data;
  } catch (error) {
    console.error("Error finding array items", error);
  }
};

export const editExercise = async (exerciseID, updatedEcxerciseData) => {
  try {
    await PUTRequest(updatedEcxerciseData, "ovelser", exerciseID);
  } catch (error) {
    console.error("Error updating entry", error);
  }
};

export const deleteExerciseSingle = async (exerciseID) => {
  try {
    await DELETERequest(exerciseID, "ovelser");
    console.log(`Exercise with ID ${exerciseID} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting exercise", error);
    throw error;
  }
};

export const deleteExercises = async (exerciseIDs) => {
  try {
    for (const id of exerciseIDs) {
      await DELETERequest(id, "ovelser");
    }
  } catch (error) {
    console.error("Error deleting exercise", error);
    throw error;
  }
};

export const deleteMany = async (muscleGroupID) => {
  try {
    const exerciseIDs = await findMuscleGroupByID(muscleGroupID);

    if (exerciseIDs.length) {
      await deleteExercises(exerciseIDs);
    }

    await DELETERequest(muscleGroupID, "muskelgrupper");
  } catch (error) {
    console.error("Error deleting muscle group and its exercises", error);
  }
};
