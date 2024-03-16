import { PageSection } from "../../components/pageSection/pageSection.component";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import "./home.styles.css";

export const HomePage = () => {
  return (
    <>
      <Wrapper className="home-page-content-wrapper">
        {/*   
        <PageSection
          wrapperClassName="welcome-widget-wrapper"
          containerClassName="welcome-widget-container"
        >
          <h3>Hey, User</h3>
        </PageSection>
        <PageSection
          wrapperClassName="calendar-wrapper"
          containerClassName="calendar-container"
        >
          <h3>Calendar view</h3>
        </PageSection>
        <PageSection
          wrapperClassName="stat-wrapper"
          containerClassName="stat-container"
        >
          <h3>Stats view</h3>
        </PageSection> */}

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
            <div className="banner-text-content">
              <h4>Your Monthly Overview</h4>
              <p>Select date to register a new workout</p>
            </div>
          </div>
          <div className="section-container">
            <div className="home-calendar-row-content">
              <div className="calendar-wrapper">
                <div className="calendar-container"></div>
              </div>
              <div className="calendar-info-wrapper"></div>
            </div>
          </div>
        </div>

        <div className="section-wrapper home-stat-wrapper">
        <div className="section-banner calendar-banner">
            <div className="banner-text-content">
              <h4>Your Stats</h4>
              <p>Track your progress</p>
            </div>
          </div>
          <div className="section-container " >
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
