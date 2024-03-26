import React from "react";
import arrowSVGLeft from "../../../public/assets/arrow-left-wide-fill.svg";
import arrowSVGRight from "../../../public/assets/arrow-right-wide-fill.svg";

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

export const Calendar = ({ onDateSelect, storedExerciseGroup = [] }) => {
  let navigate = useNavigate(); // open modal instead of navigate

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
      const prevMonthDay = subDays(startDay, i + 1);
      days.push({
        fullDate: format(prevMonthDay, "yyyy-MM-dd"),
        date: getDate(prevMonthDay),
        class: "inactive",
        actualMonth: "previous",
      });
    }

    // Add the days to the current month
    for (let i = 0; i < daysInCurrentMonth; i++) {
      const day = addDays(startDay, i);
      days.push({
        fullDate: format(day, "yyyy-MM-dd"),
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
      const nextMonthDay = addDays(endDay, i + 1);
      days.push({
        fullDate: format(nextMonthDay, "yyyy-MM-dd"),
        date: getDate(nextMonthDay),
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
        <div className="calendar-arrow-wrapper">
          <span
            onClick={() => handlePrevNextMonth("prev")}
            className="calendar-arrow-container"
          >
            <img
              src={arrowSVGLeft}
              alt="Arrow Left"
              className="calendar-nav-arrow"
            />
          </span>
          <span
            onClick={() => handlePrevNextMonth("next")}
            className="calendar-arrow-container"
          >
            <img
              src={arrowSVGRight}
              alt="Arrow Right"
              className="calendar-nav-arrow"
            />
          </span>
        </div>
      </header>
      <div className="calendar-body">
        <ul className="calendar-weekdays">
          {calendarData.daysAbbreviated.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
        <ul className="calendar-dates">
          {calendarDays.map((day, index) => {
            const hasWorkout =
              workoutDates.has(day.fullDate) && day.actualMonth === "current";
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
