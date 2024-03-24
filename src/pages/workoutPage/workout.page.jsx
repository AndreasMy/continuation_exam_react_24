import * as React from "react";
import { useState } from "react";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { WorkoutCard } from "../../molecules/workoutCard/workoutCard.molecules";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";

import "./workout.styles.css";

export const WorkoutPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [ editMode, setEditmode ] = useState(false)

  const handleSelectDate = (formData) => {
    const dateFromForm = formData["date"];
    setSelectedDate(dateFromForm);
    setEditmode(true)
    console.log(dateFromForm);
  };
  console.log(selectedDate); //logs date
  return (
    <>
      <Wrapper className="page-content-wrapper">
        <div className="section-wrapper home-welcome-wrapper">
          <div className="section-banner welcome-banner"></div>
          <div className="section-container">
            <h1>Add Workout</h1>
            <Wrapper className="entry-wrapper">
              <div className="entry-container">
                <Forms
                  onSubmit={handleSelectDate}
                  formConfig={workoutForms.workoutForm[0]}
                ></Forms>
              </div>
            </Wrapper>
            <WorkoutCard selectedDate={selectedDate} /> 
          </div>
        </div>
      </Wrapper>
    </>
  );
};
