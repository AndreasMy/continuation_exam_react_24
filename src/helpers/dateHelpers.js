import { startOfWeek, endOfWeek, isWithinInterval, parseISO } from "date-fns";
import { eachWeekOfInterval, isSameWeek } from "date-fns";

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

  let daysCount = 0;
  groupedExercises.forEach((group) => {
    if (isWithinInterval(parseISO(group.date), { start, end })) {
      daysCount++;
    }
  });

  return `${daysCount} of ${goal} days`;
};

export const calculateTotalWorkouts = (storedExerciseGroup) => {
  return storedExerciseGroup.reduce(
    (total, group) => total + group.exercises.length,
    0
  );
};
export const calculateCurrentStreak = (storedExerciseGroup, goal = 3) => {
  const now = new Date();
  if (storedExerciseGroup.length === 0) {
    return 0;
  }

  const sortedExercises = storedExerciseGroup.sort(
    (a, b) => parseISO(a.date) - parseISO(b.date)
  );
  let weeks = eachWeekOfInterval(
    {
      start: parseISO(sortedExercises[0].date),
      end: now,
    },
    { weekStartsOn: 0 }
  );

  weeks = weeks.map((weekStart) => ({
    weekStart,
    count: 0,
  }));

  sortedExercises.forEach((exercise) => {
    const exerciseWeekStart = startOfWeek(parseISO(exercise.date), {
      weekStartsOn: 0,
    });
    const week = weeks.find((w) =>
      isSameWeek(w.weekStart, exerciseWeekStart, { weekStartsOn: 0 })
    );
    if (week) {
      week.count += 1;
    }
  });

  const weeksMetGoal = weeks.filter((w) => w.count >= goal);

  let streak = 0;
  for (let i = weeksMetGoal.length - 1; i >= 0; i--) {
    if (i > 0) {
      const weekDifference =
        endOfWeek(weeksMetGoal[i].weekStart, { weekStartsOn: 0 }) -
        endOfWeek(weeksMetGoal[i - 1].weekStart, { weekStartsOn: 0 });
      if (weekDifference === 7 * 24 * 60 * 60 * 1000) {
        streak++;
      } else {
        streak++;
        break;
      }
    } else {
      streak++;
    }
  }

  return streak;
};
