import { useState, useEffect } from "react";
import { getCurrentDate } from "../../helpers/formHelpers";

export const Forms = ({ formConfig, onSubmit, defaultValues = {} }) => {
  const initialFormData = formConfig.fields.reduce((acc, field) => {
    if (field.type === "date") {
      acc[field.id] = defaultValues[field.id] || getCurrentDate();
    } else {
      acc[field.id] = defaultValues[field.id] || field.defaultValue || "";
    }
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      weight: "",
      repetitions: "",
      sets: "",
    });
  };

  return (
    <form className="crud-form" id={formConfig.id} onSubmit={handleSubmit}>
      <h3>{formConfig.title}</h3>
      {formConfig.fields.map((field) => (
        <div className="form-label-input" key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          {field.type === "select" ? (
            <select
              id={field.id}
              required={field.required}
              value={formData[field.id] || ""}
              onChange={handleChange}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="registration-input"
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.id] || ""}
              onChange={handleChange}
              autoFocus={field.autoFocus}
            />
          )}
        </div>
      ))}
      <button type={formConfig.submitButton.type}>
        {formConfig.submitButton.label}
      </button>
    </form>
  );
};
