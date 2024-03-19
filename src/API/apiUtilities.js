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

export const deleteExercises = async (exerciseIDs) => {
  const arrToDelete = Array.isArray(exerciseIDs) ? exerciseIDs : [exerciseIDs];

  try {
    for (const id of arrToDelete) {
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

export const deleteExerciseFromMuscleGroup = async (exerciseID) => {
  try {
    const exercise = await makeAPIRequest("ovelser", {
      method: "GET",
      id: exerciseID,
    });
    console.log(exercise);
    if (!exercise || !exercise.muskelgruppe) {
      console.error("Exercise or associated musclegroup not found");
      return;
    }

    const muscleGroupID = exercise.muskelgruppe;

    const muscleGroup = await makeAPIRequest("muskelgrupper", {
      method: "GET",
      id: muscleGroupID,
    });
    console.log(muscleGroup);
    if (!muscleGroup || !muscleGroup.ovelser) {
      console.error("Muscle group or its exercises array not found");
      return;
    }
    const muscleGroupName = muscleGroup.name;
    const updatedOvelser = muscleGroup.ovelser.filter(
      (id) => id !== exerciseID
    );
    console.log(updatedOvelser);

    const updatedMuscleGroup = {
      muscleGroupName,
      ovelser: updatedOvelser,
    };
    console.log(updatedOvelser);

    await makeAPIRequest("muskelgrupper", {
      method: "PUT",
      obj: updatedMuscleGroup,
      id: muscleGroupID,
    });
  } catch (error) {
    console.error("Error finding array items", error);
    throw error;
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
