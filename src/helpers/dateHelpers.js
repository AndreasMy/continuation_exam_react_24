import { startOfWeek, endOfWeek, isWithinInterval, parseISO } from "date-fns";

export const groupExercisesByDate = (exercises) => {
  if (!exercises.length) {
    return {};
  }

  const groupedByDate = exercises.reduce((acc, exercise) => {
    const date = exercise.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(exercise);
    return acc;
  }, {});

  const transformedArray = Object.keys(groupedByDate).map((date) => ({
    date: date,
    exercises: groupedByDate[date],
  }));

  return transformedArray;
};

export const calculateWeeklyGoalProgress = (groupedExercises, goal = 3) => {
  if (!Array.isArray(groupedExercises)) {
    console.error("groupedExercises is not an array", groupedExercises);
    return;
  }

  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 0 });
  const end = endOfWeek(now, { weekStartsOn: 0 });

 //return console.log(groupedExercises)
  let daysCount = 0;
  groupedExercises.forEach((group) => {
    // ncaught TypeError: groupedExercises.forEach is not a function
    if (isWithinInterval(parseISO(group.date), { start, end })) {
      daysCount++;
    }
  });

  
  return `${daysCount} of ${goal} days`;
};





