import * as React from "react";
import { useEffect } from "react";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { WorkoutCard } from "../../molecules/workoutCard/workoutCard.molecules";

import "./workout.styles.css";

export const WorkoutPage = () => {

  return (
    <>
      <Wrapper className="page-content-wrapper">
        <div className="section-wrapper home-welcome-wrapper">
          <div className="section-banner welcome-banner"></div>
          <div className="section-container">
            <h1>Add Workout</h1>

            <WorkoutCard

            />
          </div>
        </div>
      </Wrapper>
    </>
  );
};
