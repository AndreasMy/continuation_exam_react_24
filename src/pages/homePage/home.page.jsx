import "./home.styles.css";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Calendar } from "../../components/calendar/calendar.component";
import { useWorkoutContext } from "../../context/workoutContext";
import bannerImage from "../../../public/assets/banner-image.webp";
import { PageSection } from "../../components/pageSection/pageSection.component";
import { Heading } from "../../components/heading/heading.component";

import { format } from "date-fns";

export const HomePage = () => {
  const { selectedDate, storedExerciseGroup, handleDateSelect, exerciseList } =
    useWorkoutContext();

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
          <div className="workout-list-wrapper">
            {" "}
            <Wrapper className="session-cards-wrapper">
              {Array.isArray(storedExerciseGroup) &&
                storedExerciseGroup.map((session) => (
                  <div
                    key={session.date}
                    className="session-card"
                    /* onClick={() => handleClickEntryCard(session)} */
                  >
                     <Heading as="h4">{format(new Date(session.date), "EEEE MMMM d")}</Heading>
                    <ul>
                      {session.exercises.map((exercise) => (
                        <li key={exercise._id} className="session-card-list">
                          <h4>{exercise.name}</h4>
                          <p>Reps: {exercise.repetitions} </p>
                          <p>Sets: {exercise.sets}</p>
                          <p>{exercise.weight} kg</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </Wrapper>
          </div>
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
