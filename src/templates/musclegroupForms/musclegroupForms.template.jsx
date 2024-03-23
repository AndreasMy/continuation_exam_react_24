/* eslint-disable react/prop-types */
import { useState } from "react";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { Modal } from "../../components/modal/modal.component";
import { makeAPIRequest } from "../../API/apiServices";
import { deleteMuscleGroupAndExercises } from "../../API/apiUtilities";
import { useModal } from "../../context/modalContext";

export const MuscleGroupSection = ({
  setSelectedMuscleGroup,
  setMuscleGroupSelected,
  group,
  loadMuscleGroups,
  loadExercises,
}) => {
  const { musclegroupID, setMuscleGroupID, openModal, closeModal } = useModal();

  const [currentMuscleGroup, setCurrentMuscleGroup] = useState({});

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
      openModal(
        <Forms
          formConfig={workoutForms.musclegroupForms[0]}
          onSubmit={(formData) => handleEditFormSubmit(formData, musclegroupID)}
          defaultValues={musclegroupObj}
        />
      );
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleEditFormSubmit = async (formData, musclegroupID) => {
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
      closeModal();
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
      <ul>
        <InteractiveListItem
          onDelete={() => handleDelete(group._id)}
          /* onSelect={() => handleSelectItem(group)} // I need to use something */
          onEdit={() => handleEdit(group._id)}
        >
          {group.navn}
        </InteractiveListItem>

        {/*         {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <Forms
              formConfig={workoutForms.musclegroupForms[0]}
              onSubmit={handleEditFormSubmit}
              defaultValues={currentMuscleGroup}
            />
          </Modal>
        )} */}
      </ul>
    </Wrapper>
  );
};
