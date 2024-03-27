export const workoutForms = {
  exerciseForms: [
    {
      id: "exerciseForm",
      fields: [
        {
          id: "name",
          type: "text",
          label: "Exercise",
          placeholder: "Exercise",
          required: true,
        },
        {
          id: "weight",
          type: "number",
          label: "Weight",
          placeholder: "Weight",
          required: true,
        },
        {
          id: "repetitions",
          type: "number",
          label: "Repetitions",
          placeholder: "Repetitions",
          required: true,
        },
        {
          id: "sets",
          type: "number",
          label: "Sets",
          placeholder: "Sets",
          required: true,
        },
      ],
      submitButton: {
        label: "Submit",
        type: "submit",
        className: "submit-button",
      },
      cancelButton: {
        label: "Cancel",
        type: "button",
        className: "cancel-button",
      },
    },
  ],
  musclegroupForms: [
    {
      id: "musclegroupForm",
      fields: [
        {
          id: "navn",
          type: "text",
          label: "Name",
          placeholder: "Rygg, bein, etc...",
          required: true,
          autoFocus: true,
        },
      ],
      submitButton: {
        label: "Submit",
        type: "submit",
      },
    },
  ],
  workoutForm: [
    {
      id: "workoutForm",
      fields: [
        {
          id: "date",
          type: "date",
          label: "Date",
          placeholder: "YYYY-MM-DD",
          required: true,
          autoFocus: true,
        },
      ],
      submitButton: {
        label: "New Workout",
        type: "submit",
        className: "submit-button",
      },
      cancelButton: {
        label: "Cancel",
        type: "button",
        className: "cancel-button",
      },
    },
  ],
};
