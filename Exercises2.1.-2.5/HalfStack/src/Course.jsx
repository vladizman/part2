const Course = ({ course }) => {
  console.log(course);

  const initialValue = 0;
  const totalExercises = course.parts.reduce(
    (acumulator, currentValue) => acumulator + currentValue.exercises,
    initialValue
  );

  return (
    <>
      <h1>{course.name}</h1>

      {course.parts.map((part, index) => (
        <p key={index}>
          {part.name}, {part.exercises}
        </p>
      ))}

      <p>total of exercises = {totalExercises}</p>
    </>
  );
};

export default Course;
