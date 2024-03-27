import "./home.styles.css";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Calendar } from "../../components/calendar/calendar.component";
import { useWorkoutContext } from "../../context/workoutContext";
import bannerImage from "../../../public/assets/banner-image.webp";
import { PageSection } from "../../components/pageSection/pageSection.component";
import { Heading } from "../../components/heading/heading.component";
import { WorkoutSessionList } from "../../molecules/workoutSessionList/WorkoutSessionList.molecules";
import { useState, useEffect } from "react";
import { calculateWeeklyGoalProgress } from "../../helpers/dateHelpers";
import { groupExercisesByDate, calculateCurrentStreak, calculateTotalWorkouts } from "../../helpers/dateHelpers";

export const HomePage = () => {
  const [weeklyGoalProgress, setWeeklyGoalProgress] = useState("");
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  
  const { selectedDate, storedExerciseGroup, handleDateSelect } =
    useWorkoutContext();

    useEffect(() => {
      if (storedExerciseGroup && storedExerciseGroup.length > 0) {
        setTotalWorkouts(calculateTotalWorkouts(storedExerciseGroup));
        setCurrentStreak(calculateCurrentStreak(storedExerciseGroup, 3));
      }
    }, [storedExerciseGroup]);

  useEffect(() => {
    if (storedExerciseGroup && storedExerciseGroup.length > 0) {
      const progress = calculateWeeklyGoalProgress(
        groupExercisesByDate(storedExerciseGroup),
        3
      );
      setWeeklyGoalProgress(progress);
    }
  }, [storedExerciseGroup]);

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
            <div className="home-welcome-section-stats">
              <div className="stat-container">
                <h4>Weekly Goal</h4>
                <p>{weeklyGoalProgress}</p>
              </div>
              <div className="stat-container">
                <h4>Current Streak</h4>
                <p>{currentStreak} weeks</p>
              </div>
              <div className="stat-container">
                <h4>Total workouts</h4>
                <p>{totalWorkouts}</p>
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
          <WorkoutSessionList storedExerciseGroup={storedExerciseGroup} />
        </PageSection>
      </Wrapper>
    </>
  );
};
