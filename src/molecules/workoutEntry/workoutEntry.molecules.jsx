import "./workoutEntry.styles.css";

import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Button } from "../../components/button/button.component";
import { Forms } from "../../components/forms/forms.component";
import { workoutForms } from "../../data/workoutForms";

export const WorkoutEntry = () => {
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
  // Manage state here
  return (
    <>
      <Wrapper className="workout-entry-wrapper">
        <Wrapper className="left" isContainer={true}>
          {/* Make this a component? */}
          <div className="workout-card-large">
            <div className="card-upper-content">
              <div className="workout-card-date-content">
                {/* Selected date and day is shown here */}
                <h1>Monday April 1st</h1>
              </div>
              <div className="workout-card-main-content">
                <h3>Chest</h3>
                <div className="line"></div>
                <Button>Add Exercise</Button>
                <h3>Arms</h3>
                <div className="line"></div>
                <Button>Add Exercise</Button>
                <h3>Core</h3>
                <div className="line"></div>
                <Button>Add Exercise</Button>
                <h3>Back</h3>
                <div className="line"></div>
                <Button>Add Exercise</Button>
                <h3>Legs</h3>
                <div className="line"></div>
                <Button>Add Exercise</Button>
                {/* Component that renders a muscle group */}
              </div>
            </div>
            <div className="workout-card-button-wrapper">
              <div className="workout-card-button-container">
                <Button>Cancel</Button>
                <Button>Submit</Button>
              </div>
              {/* Cancel and submit buttons */}
            </div>
          </div>
        </Wrapper>
        <Wrapper className="right" isContainer={true}>
          <Forms
            onSubmit={handleFormSubmit}
            formConfig={workoutForms.musclegroupForms[0]}
          />
          <Forms
            onSubmit={handleFormSubmit}
            formConfig={workoutForms.exerciseForms[0]}
          />
          {/* Conditionally rendered forms here */}
        </Wrapper>
      </Wrapper>
    </>
  );
};
