import { Wrapper } from "../../components/wrapper/wrapper.component";
import "./home.styles.css";
import { PageSection } from "../../components/pageSection/pageSection.component";
// Styles are inherited from PageSection component
// Keep that in mind when updating the component to refactor this and other pages

import { Button } from "../../components/button/button.component";
import { useModal } from "../../context/modalContext";
import { WorkoutEntry } from "../../molecules/workoutEntry/workoutEntry.molecules";

export const HomePage = () => {
  const { openModal } = useModal();

  return (
    <>
      <Wrapper className="page-content-wrapper">
        <div className="section-wrapper home-welcome-wrapper">
          <div className="section-banner welcome-banner"></div>
          <div className="section-container">
            <h1>Welcome, User!</h1>
            <div className="home-welcome-section-stats">
              <div className="stat-container">
                <h4>Weekly Goal</h4>
                <p>2 out of 3 days</p>
              </div>
              <div className="stat-container">
                <h4>Current Streak</h4>
                <p>6 weeks</p>
              </div>
              <div className="stat-container">
                <h4>Total workouts</h4>
                <p>48</p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-wrapper">
          <div className="section-banner calendar-banner">
            {/* banner will have two modes; image or text banner */}
            <div className="banner-text-content">
              <h4>Your Monthly Overview</h4>
              <p>Select date to register a new workout</p>
            </div>
          </div>
          <div className="section-container">
            {/* section container houses children */}
            <div className="home-calendar-row-content">
              <div className="calendar-wrapper">
                {/* div above will be a container component */}
                <div className="calendar-container"></div>
                {/* container will be defined at component level */}
              </div>
              <div className="calendar-info-wrapper"></div>
              {/* div above will be a container component */}
            </div>
            <Button onClick={() => openModal(<WorkoutEntry />)}>
              Open Exercises From Global Scope
            </Button>
          </div>
        </div>

        <div className="section-wrapper home-stat-wrapper">
          <div className="section-banner calendar-banner">
            <div className="banner-text-content">
              <h4>Your Stats</h4>
              <p>Track your progress</p>
            </div>
          </div>
          <div className="section-container ">
            <div className="home-calendar-row-content">
              <div className="calendar-wrapper">
                <div className="calendar-container"></div>
              </div>
              <div className="calendar-info-wrapper"></div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
