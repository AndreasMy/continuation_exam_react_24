/* eslint-disable react/prop-types */

import { useState } from "react";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Button } from "../../components/button/button.component";
import { InteractiveListItem } from "../../molecules/InteractiveListItem/InteractiveListItem.molecule";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";
import { submitForm } from "../../helpers/formHelpers";
///import { DELETERequest } from '../../API/API';
import { deleteMany } from "../../API/apiUtilities";

export const MuscleGroupSection = ({
  setMuscleGroupID,
  setSelectedMuscleGroup,
  setMuscleGroupSelected,
  musclegroups,
  loadMuscleGroups,
  loadExercises,
}) => {
  const [isClicked, setIsClicked] = useState(false);

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
      await deleteMany(id);
      await loadExercises();
      await loadMuscleGroups();
    } catch (error) {
      console.error("Error deleting muscle group", error);
    }
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
            // onEdit={() => hadleEdit(group._id)}
          >
            {group.navn}
          </InteractiveListItem>
        ))}
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
