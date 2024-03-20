/* eslint-disable react/prop-types */

import { useState } from "react";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Button } from "../../components/button/button.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { submitForm } from "../../helpers/formHelpers";
import { Modal } from "../../components/modal/modal.component";
import { makeAPIRequest } from "../../API/apiServices";

import { deleteMuscleGroupAndExercises } from "../../API/apiUtilities";

export const MuscleGroupSection = ({
  setMuscleGroupID,
  musclegroupID,
  setSelectedMuscleGroup,
  setMuscleGroupSelected,
  musclegroups,
  loadMuscleGroups,
  loadExercises,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMuscleGroup, setCurrentMuscleGroup] = useState({});

  const handleButtonClick = () => {
    setIsClicked(true);
  };

  const handleFormSubmit = async (FormData) => {
    await submitForm(
      FormData,
      workoutForms.musclegroupForms[0],
      "muskelgrupper",
      { ovelser: [] },
      loadMuscleGroups
    );
    setIsClicked(false);
  };

  const handleSelectItem = (group) => {
    setMuscleGroupSelected(true);
    setMuscleGroupID(group._id);
    setSelectedMuscleGroup(group.navn);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMuscleGroupAndExercises(id);
      await loadExercises();
      await loadMuscleGroups();
    } catch (error) {
      console.error("Error deleting muscle group", error);
    }
  };

  const handleEdit = async (musclegroupID) => {
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

  const handleEditFormSubmit = async (formData) => {
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    loadMuscleGroups();
    setMuscleGroupID(null);
  };

  return (
    <Wrapper className={"muscle-group-section"}>
      <h2>Muscle groups</h2>
      <ul>
        {musclegroups.map((group) => (
          <InteractiveListItem
            key={group._id}
            onDelete={() => handleDelete(group._id)}
            onSelect={() => handleSelectItem(group)}
            onEdit={() => handleEdit(group._id)}
          >
            {group.navn}
          </InteractiveListItem>
        ))}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <Forms
              formConfig={workoutForms.musclegroupForms[0]}
              onSubmit={handleEditFormSubmit}
              defaultValues={currentMuscleGroup}
            />
          </Modal>
        )}
      </ul>
      {isClicked ? (
        <Forms
          onSubmit={handleFormSubmit}
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
