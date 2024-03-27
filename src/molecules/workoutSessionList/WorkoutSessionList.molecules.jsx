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
        filteredSessions.map((session) => (
          <div
            key={session.date}
            className="session-card"
          >
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
        ))}
    </Wrapper>
  );
};
