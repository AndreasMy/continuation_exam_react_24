export const sortExercisesByDate = (exercises) => {
  if (!exercises.length) {
    console.log("No exercises to sort.");
    return [];
  }

  const sortedExercises = exercises.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  console.log("Sorted exercises:", sortedExercises);
  return sortedExercises;
};

export const groupExercisesByDate = (exercises) => {
  if (!exercises.length) {
    return {};
  }
  console.log("Exercises to reduce: ", exercises);
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

  console.log("Grouped Exercises: ", groupedByDate);
  console.log("Improved arrays: ", transformedArray);
  return transformedArray;
};
