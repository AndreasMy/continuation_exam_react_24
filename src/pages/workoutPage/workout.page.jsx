import { Wrapper } from "../../components/wrapper/wrapper.component";

export const WorkoutPage = () => {
  return (
    <>
      <Wrapper className="page-content-wrapper">
        <div className="section-wrapper home-welcome-wrapper">
          <div className="section-banner welcome-banner"></div>
          <div className="section-container">
            <h1>Welcome, User!</h1>
            <div className="home-welcome-section-stats">
              <div className="stat-container">
                <h4>Pick a date</h4>
                <Date></Date>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
