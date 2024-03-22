import "./workoutEntry.styles.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { useFetchList } from "../../API/useFetchList";
import { makeAPIRequest } from "../../API/apiServices";

import { Wrapper } from "../../components/wrapper/wrapper.component";

import { deleteMuscleGroupAndExercises } from "../../API/apiUtilities";
import { WorkoutEntryCard } from "../workoutEntryCard/workoutEntryCard.template";

export const WorkoutEntry = () => {
  const [musclegroupSelected, setMuscleGroupSelected] = useState(false);
  const [musclegroupID, setMuscleGroupID] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);

  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentExercise, setCurrentExercise] = useState({});
  const [currentExerciseId, setCurrentExerciseId] = useState(null);
  const [currentMuscleGroup, setCurrentMuscleGroup] = useState({});

  const { list: musclegroups, loadList: loadMuscleGroups } =
    useFetchList("muskelgrupper");
  const { list: exercisesList, loadList: loadExercises } =
    useFetchList("ovelser");

  useEffect(() => {
    loadMuscleGroups();
    loadExercises();
  }, [loadMuscleGroups, loadExercises]);

  //? Exercise helpers
  const handleEditExercise = async (exerciseID) => {
    try {
      const selectedExercise = await makeAPIRequest("ovelser", {
        method: "GET",
        id: exerciseID,
      });
      setCurrentExerciseId(exerciseID);
      setCurrentExercise(selectedExercise);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching exercise details", error);
    }
  };

  const handleModalCloseEX = () => {
    setIsModalOpen(false);
    setCurrentExerciseId(null);
    setCurrentExercise({});
  };

  const handleEditExerciseFormSubmit = async (formData) => {
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

  const handleDeleteExercise = async (exerciseID) => {
    try {
      await deleteExerciseFromMuscleGroup(exerciseID);
      await deleteExercises(exerciseID);
      await loadExercises();
    } catch (error) {
      console.error("Error deleting muscle Exercise", error);
    }
  };

  //? Muscle group helpers

  const handleButtonClick = () => {
    setIsClicked(true);
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

  const handleSelectMuscleGroupItem = (group) => {
    setMuscleGroupSelected(true);
    setMuscleGroupID(group._id);
    setSelectedMuscleGroup(group.navn);
  };

  const handleDeleteMuscleGroup = async (id) => {
    try {
      await deleteMuscleGroupAndExercises(id);
      await loadExercises();
      await loadMuscleGroups();
    } catch (error) {
      console.error("Error deleting muscle group", error);
    }
  };

  const handleEditMuscleGroup = async (musclegroupID) => {
    try {
      const musclegroupObj = await makeAPIRequest("muskelgrupper", {
        method: "GET",
        id: musclegroupID,
      });

      setCurrentMuscleGroup(musclegroupObj);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleEditMuscleGroupFormSubmit = async (formData) => {
    try {
      if (!musclegroupID) {
        console.error("No musclegroup ID is set for editing");
      }

      const currentMuscleGroup = await makeAPIRequest("muskelgrupper", {
        method: "GET",
        id: musclegroupID,
      });

      const updatedMuscleGroup = {
        ...formData,
        ovelser: currentMuscleGroup.ovelser,
      };

      await makeAPIRequest("muskelgrupper", {
        method: "PUT",
        obj: updatedMuscleGroup,
        id: musclegroupID,
      });

      loadMuscleGroups();
      setIsModalOpen(false);
      setSelectedMuscleGroup(null);
      setMuscleGroupID(null);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleModalCloseMG = () => {
    setIsModalOpen(false);
    loadMuscleGroups();
    setMuscleGroupID(null);
  };

  return (
    <>
      <Wrapper className="workout-entry-wrapper">
        <Wrapper className="left" isContainer={true}>
          <WorkoutEntryCard
            setMuscleGroupSelected={setMuscleGroupSelected}
            setMuscleGroupID={setMuscleGroupID}
            musclegroupID={musclegroupID}
            setSelectedMuscleGroup={setSelectedMuscleGroup}
            selectedMuscleGroup={selectedMuscleGroup}
            musclegroups={musclegroups}
            loadMuscleGroups={loadMuscleGroups}
            loadExercises={loadExercises}
            exercisesList={exercisesList}
            musclegroupSelected={musclegroupSelected}
            isModalOpen={isModalOpen}
            isClicked={isClicked}
            handleButtonClick={handleButtonClick}
            handleModalCloseMG={handleModalCloseMG}
            handleModalCloseEX={handleModalCloseEX}
            handleEditMuscleGroupFormSubmit={handleEditMuscleGroupFormSubmit}
            handleEditMuscleGroup={handleEditMuscleGroup}
            handleMuscleGroupFormSubmit={handleMuscleGroupFormSubmit}
            handleDeleteMuscleGroup={handleDeleteMuscleGroup}
            handleEditExerciseFormSubmit={handleEditExerciseFormSubmit}
            handleDeleteExercise={handleDeleteExercise}
            handleEditExercise={handleEditExercise}
            currentExercise={currentExercise}
            currentMuscleGroup={currentMuscleGroup}
            handleSelectMuscleGroupItem={handleSelectMuscleGroupItem}
          />
        </Wrapper>
      </Wrapper>
    </>
  );
};
