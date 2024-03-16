import { PageSection } from "../../components/pageSection/pageSection.component";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import "./home.styles.css";

export const MainPage = () => {
  return (
    <>
      <Wrapper className="main-page-content-wrapper">
        <h2>Main page</h2>
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
        </PageSection>
      </Wrapper>
    </>
  );
};
