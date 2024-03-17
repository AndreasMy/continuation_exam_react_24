/* eslint-disable react/prop-types */
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { submitForm } from "../../helpers/formHelpers";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";

import { populateMuscleGroupArray } from "../../API/apiUtilities";

export const ExerciseSection = ({
  musclegroupID,
  musclegroupSelected,
  selectedMuscleGroup,
  loadExercises,
}) => {
  const handleFormSubmit = async (FormData) => {
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

  return (
    <Wrapper className={"exercise-section"}>
      <h2>Add Exercise</h2>
      <h3>Muscle group: {selectedMuscleGroup}</h3>
      <Forms
        onSubmit={handleFormSubmit}
        formConfig={workoutForms.exerciseForms[0]}
      />
    </Wrapper>
  );
};
