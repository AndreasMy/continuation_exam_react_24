import { makeAPIRequest } from "/src/API/apiServices.js";

export const stringifyFormData = (formData, formConfig) => {
  const formattedData = {};

  formConfig.fields.forEach((field) => {
    if (field.type === "number") {
      formattedData[field.id] = parseInt(formData[field.id], 10);
    } else {
      formattedData[field.id] = formData[field.id];
    }
  });
  return formattedData;
};

export const createFormData = (formData, formConfig, additionalData = {}) => {
  const formattedData = stringifyFormData(formData, formConfig);
  return { ...formattedData, ...additionalData };
};

export const submitForm = async (
  formConfig,
  formData,
  endpoint,
  additionalData = {},
  postSubmitAction
) => {
  try {
    const data = createFormData(formConfig, formData, additionalData);
    const response = await makeAPIRequest(endpoint, {
      method: "POST",
      obj: data,
    });

    if (postSubmitAction) {
      await postSubmitAction(response);
    }
    return response;
  } catch (error) {
    console.error(`Error submitting data to ${endpoint}`, error);
    throw error;
  }
};

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
