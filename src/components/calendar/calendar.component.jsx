import { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  getDay,
  getDaysInMonth,
  addDays,
  subDays,
  getDate,
  isSameDay,
  format,
} from "date-fns";
import { calendarData } from "../../data/calendarData";
import { Wrapper } from "../wrapper/wrapper.component";
import { useNavigate } from "react-router-dom";
import "./calendar.styles.css";

export const Calendar = ({
  selectedDate,
  onDateSelect,
  storedExerciseGroup = [],
}) => {
  let navigate = useNavigate();


  const now = new Date();
  const [currentDate, setCurrentDate] = useState(now);
  const [calendarDays, setCalendarDays] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  const onDaySelect = (day) => {
    if (onDateSelect && day.actualMonth === "current") {
      const fullDate = new Date(year, month, day.date);
      const formattedDate = format(fullDate, "yyyy-MM-dd");
      navigate("/workouts", { state: { formattedDate } });
      onDateSelect(formattedDate);
    }
  };

  const workoutDates = new Set(
    Array.isArray(storedExerciseGroup)
      ? storedExerciseGroup.map((session) => session.date)
      : []
  );

  const generateCalendarDays = () => {
    const days = [];
    const startDay = startOfMonth(currentDate);
    const endDay = endOfMonth(currentDate);

    const daysInCurrentMonth = getDaysInMonth(currentDate);
    const firstDayOfWeek = getDay(startDay);

    // Add days from the previous month to fill the first week
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: getDate(subDays(startDay, i + 1)),
        class: "inactive",
        actualMonth: "previous",
      });
    }

    // Add the days to the current month
    for (let i = 0; i < daysInCurrentMonth; i++) {
      const day = addDays(startDay, i);
      days.push({
        date: getDate(day),
        class: isSameDay(day, new Date()) ? "active" : "",
        actualMonth: "current",
      });
    }

    // Calculate how many days to add from the next month to fill the last week
    let totalSlots = Math.ceil((firstDayOfWeek + daysInCurrentMonth) / 7) * 7;
    let daysFromNextMonth = totalSlots - days.length;

    // Add days from the next month
    for (let i = 0; i < daysFromNextMonth; i++) {
      days.push({
        date: getDate(addDays(endDay, i + 1)),
        class: "inactive",
        actualMonth: "next",
      });
    }

    setCalendarDays(days);
  };

  const handlePrevNextMonth = (direction) => {
    const newMonth = month + (direction === "prev" ? -1 : 1);
    setCurrentDate(new Date(year, newMonth, 1));
  };

  return (
    <Wrapper className="calendar-container">
      <header className="calendar-header">
        <p className="calendar-current-date">{`${calendarData.months[month]} ${year}`}</p>
        <span
          onClick={() => handlePrevNextMonth("prev")}
          className="material-symbols-rounded"
        >
          chevron_left
        </span>
        <span
          onClick={() => handlePrevNextMonth("next")}
          className="material-symbols-rounded"
        >
          chevron_right
        </span>
      </header>
      <div className="calendar-body">
        <ul className="calendar-weekdays">
          {calendarData.daysAbbreviated.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
        <ul className="calendar-dates">
          {calendarDays.map((day, index) => {
            const fullDate = format(
              new Date(year, month, day.date),
              "yyyy-MM-dd"
            );
            const hasWorkout = workoutDates.has(fullDate);
            return (
              <li
                key={index}
                className={`${day.class} ${hasWorkout ? "has-workout" : ""}`}
                onClick={() => onDaySelect(day)}
              >
                {day.date}
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};
