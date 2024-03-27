import React, { useState, useEffect, useSyncExternalStore } from "react";
import { useCalendarContext } from "../../context/calendarContex";
import { parseISO, getMonth, getYear, format, compareAsc } from "date-fns";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { Heading } from "../../components/heading/heading.component";

export const WorkoutSessionList = ({ storedExerciseGroup }) => {
  const { selectedMonth, selectedYear } = useCalendarContext();
  const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    if (Array.isArray(storedExerciseGroup)) {
      const filtered = storedExerciseGroup.filter((session) => {
        const sessionDate = parseISO(session.date);
        return (
          getMonth(sessionDate) === selectedMonth &&
          getYear(sessionDate) === selectedYear
        );
      });

      const sorted = filtered.sort((a, b) =>
        compareAsc(parseISO(a.date), parseISO(b.date))
      );

      setFilteredSessions(sorted);
    }
  }, [storedExerciseGroup, selectedMonth, selectedYear]);

  return (
    <Wrapper className="session-cards-wrapper">
      {Array.isArray(filteredSessions) &&
        filteredSessions.length > 0 ?
        filteredSessions.map((session) => (
          <div key={session.date} className="session-card">
            <Heading as="h4">
              {format(new Date(session.date), "EEEE MMMM d")}
            </Heading>
            <div className="line"></div>
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
        )) : (
            <div className="session-card placeholder">
            <Heading as="h4">No Workout Sessions Found</Heading>
            <p>Looks like you don't have any sessions for this period</p>
            <br />
            <p>Add a Workout Session By Selecting a Date on the Calendar</p>
          </div>
        ) }
    </Wrapper>
  );
};
