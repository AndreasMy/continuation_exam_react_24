import React, { createContext, useContext, useState } from "react";
import { makeAPIRequest } from "../API/apiServices";
import { Forms } from "../components/forms/forms.component";
import { workoutForms } from "../data/workoutForms";
import { handleEditMuscleGroupFormSubmit } from "../helpers/formLogicHelpers";
import { useWorkout } from "./workoutContext";
import { handleEditExerciseFormSubmit } from "../helpers/formLogicHelpers";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [editingMuscleGroup, setEditingMuscleGroup] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);

  const {
    setSelectedMuscleGroup,
    musclegroupID,
    setMuscleGroupID,
    loadMuscleGroups,
    currentExerciseId,
    setCurrentExerciseId,
  } = useWorkout();

  console.log(currentExerciseId); // is logged

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const setupEditExerciseModal = async (exerciseId) => {
    console.log("ExerciseId: ", exerciseId); // is logged
    try {
      const selectedExercise = await makeAPIRequest("ovelser", {
        method: "GET",
        id: exerciseId,
      });
      setCurrentExerciseId(exerciseId);
      console.log(currentExerciseId) // null
      setEditingExercise(selectedExercise);
      openModal(
        <Forms
          formConfig={workoutForms.exerciseForms[0]}
          onSubmit={(formData) =>
            handleEditExerciseFormSubmit(formData, {
              currentExerciseId: exerciseId,
              setCurrentExerciseId,
            })
          }
          defaultValues={selectedExercise}
        />
      );
    } catch (error) {
      console.error("Error fetching exercise details", error);
    }
  };

  const setupEditMuscleGroupModal = async (muscleGroupId) => {
    console.log("trying to log muscleGroupId: ", muscleGroupId); //is logged
    try {
      const muscleGroupObj = await makeAPIRequest("muskelgrupper", {
        method: "GET",
        id: muscleGroupId,
      });
      openModal(
        <Forms
          formConfig={workoutForms.musclegroupForms[0]}
          onSubmit={(formData) =>
            handleEditMuscleGroupFormSubmit(formData, {
              muscleGroupId,
              musclegroupID, // doesn't get passed
              setIsModalOpen,
              setSelectedMuscleGroup,
              setMuscleGroupID,
              loadMuscleGroups,
            })
          }
          defaultValues={muscleGroupObj}
        />
      );
    } catch (error) {
      console.error("Error fetching muscle group details", error);
    }
  };

  const openModalForAddingExercise = (
    muscleGroupId,
    handleSubmit,
    loadExercises
  ) => {
    // Optionally use muscleGroupId to pre-fill or pass information to the form
    openModal(
      <Forms
        onSubmit={handleSubmit} // You will define this function to handle form submission
        formConfig={workoutForms.exerciseForms[0]}
        additionalProps={{ muscleGroupId }} // Pass additional props as needed
      />
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setEditingMuscleGroup(null);
    setEditingExercise(null);
  };

  return (
    <ModalContext.Provider
      value={{
        openModalForAddingExercise,
        setupEditMuscleGroupModal,
        setupEditExerciseModal,
        isModalOpen,
        modalContent,
        openModal,
        closeModal,
        editingMuscleGroup,
        editingExercise,
        // openMoadlForAddingExercise,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
