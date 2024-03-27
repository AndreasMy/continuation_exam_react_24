import { makeAPIRequest } from "./apiServices";

export const populateMuscleGroupArray = async (exerciseID, muscleGroupID) => {
  try {
    const muscleGroup = await makeAPIRequest("musclegroups", {
      method: "GET",
      id: muscleGroupID,
    });
    if (muscleGroup) {
      const updatedMG = {
        name: muscleGroup.name,
        exercises: [...muscleGroup.exercises, exerciseID],
      };
      await makeAPIRequest("musclegroups", {
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
      await makeAPIRequest("exercises", { method: "DELETE", id: id });
    }
  } catch (error) {
    console.error("Error deleting exercise", error);
    throw error;
  }
};

export const fetchExercisesByMuscleGroupID = async (musclegroupID) => {
  try {
    const data = await makeAPIRequest("musclegroups", {
      method: "GET",
      id: musclegroupID,
    });
    const arrayData = [...data.exercises];
    return arrayData;
  } catch (error) {
    console.error("Error finding array items", error);
  }
};

export const deleteExerciseFromMuscleGroup = async (exerciseID) => {
  try {
    const exercise = await makeAPIRequest("exercises", {
      method: "GET",
      id: exerciseID,
    });

    if (!exercise || !exercise.musclegroup) {
      console.error("Exercise or associated musclegroup not found");
      return;
    }

    const muscleGroupID = exercise.musclegroup;
    const muscleGroup = await makeAPIRequest("musclegroups", {
      method: "GET",
      id: muscleGroupID,
    });

    if (!muscleGroup || !muscleGroup.exercises) {
      console.error("Muscle group or its exercises array not found");
      return;
    }
    
    const name = muscleGroup.name;
    const updatedExercises = muscleGroup.exercises.filter(
      (id) => id !== exerciseID
    );

    const updatedMuscleGroup = {
      name,
      exercises: updatedExercises,
    };

    await makeAPIRequest("musclegroups", {
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
    await makeAPIRequest("musclegroups", {
      method: "DELETE",
      id: musclegroupID,
    });
  } catch (error) {
    console.error("Error deleting muscle group and its exercises", error);
  }
};
