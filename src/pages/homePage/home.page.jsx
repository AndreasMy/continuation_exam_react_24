import "./home.styles.css";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Calendar } from "../../components/calendar/calendar.component";
import { useWorkoutContext } from "../../context/workoutContext";
import { useModal } from "../../context/modalContext";
import bannerImage from "../../../public/assets/banner-image.webp";
import { PageSection } from "../../components/pageSection/pageSection.component";
import { Heading } from "../../components/heading/heading.component";
import { useEffect } from "react";
import { groupExercisesByDate } from "../../helpers/dateHelpers";

export const HomePage = () => {
  const {
    selectedDate,
    storedExerciseGroup,
    handleDateSelect,
    setStoredExerciseGroup,
    setIsAddingWorkout,
    loadExercises,
    exercisesList,
  } = useWorkoutContext();

  const { modals } = useModal();

  useEffect(() => {
    // Trigger the logic when the last modal is closed (i.e., modals array length is 0)
    if (modals.length === 0) {
      const updateExercises = async () => {
        await loadExercises();
        const updatedList = groupExercisesByDate(exercisesList);
        setStoredExerciseGroup(updatedList);
        // Only set `isAddingWorkout` to false if necessary,
        // e.g., if this logic should only run after closing a specific modal related to workouts.
        setIsAddingWorkout(false);
      };

      updateExercises();
    }
  }, [
    modals.length,
    loadExercises,
    exercisesList,
    setStoredExerciseGroup,
    setIsAddingWorkout,
  ]);

  return (
    <>
      <Wrapper className="page-content-wrapper">
        <PageSection
          wrapperClassName="home-welcome-wrapper"
          wrapperProps={{ style: { flexDirection: "column" } }}
          containerProps={{ style: { flexDirection: "column" } }}
          bannerContent={
            <img
              src={bannerImage}
              alt="Banner image"
              className="section-banner welcome-banner"
            />
          }
        >
          {/* Make component */}
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
        </PageSection>
        <PageSection
          wrapperClassName="home-calendar-wrapper"
          useInnerContainer={true}
          containerProps={{ style: { padding: "20px" } }}
          wrapperProps={{ style: { background: "var(--gradient-B)" } }}
          bannerProps={{ style: { background: "var(--banner-color)" } }}
          bannerContent={
            <div className="banner-text-content">
              <Heading as="h3">Your Monthly Overview</Heading>
              <Heading as="p">Select a date to log a workout session</Heading>
            </div>
          }
        >
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            storedExerciseGroup={storedExerciseGroup}
          />
          <div className="workout-list-wrapper"></div>
        </PageSection>
        {/*         <div className="section-wrapper home-stat-wrapper">
          <div className="section-banner calendar-banner">
            <div className="banner-text-content">
              <h4>Your Stats</h4>
              <p>Track your progress</p>
            </div>
          </div>
          <div className="section-container ">
            <div className="home-calendar-row-content">
              <div className="calendar-wrapper">
              </div>
              <div className="calendar-info-wrapper"></div>
            </div>
          </div>
        </div> */}
      </Wrapper>
    </>
  );
};
