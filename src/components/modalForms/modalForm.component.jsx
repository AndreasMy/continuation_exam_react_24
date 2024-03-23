import { FORM_TYPES } from "../../data/enums";
import { workoutForms } from "../../data/workoutForms";
import { Forms } from "../forms/forms.component";

export const ModalForm = ({ formType }) => {
  let formConfig;
  let formData;
  let defaultValues

  switch (formType) {
    case FORM_TYPES.ADD_MUSCLE_GROUP:
      formConfig = workoutForms.musclegroupForms[0];
      break;
    case FORM_TYPES.ADD_EXERCISE:
      formConfig = workoutForms.exerciseForms[0];
      break;
    case FORM_TYPES.EDIT_MUSCLE_GROUP:
      formConfig = workoutForms.musclegroupForms[0];
      break;
    case FORM_TYPES.EDIT_EXERCISE:
      formConfig = workoutForms.exerciseForms[0];
      break;

    default:
      console.error("Invalid form type provided");
      return null;
  }

  return (
    <Forms
      formConfig={formConfig}
      onSubmit={(formData) => onSubmit(formData)}
      defaultValues={defaultValues}
    />
  );
};
