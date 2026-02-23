const Total = ({ parts }) => {
  const initialValue = 0
  const sum = parts.reduce(
    (accumulator, currentValue) => 
      accumulator + currentValue.exercises, 
      initialValue
  )

  return (
    <p><b>Total {sum}</b></p>
  )
}

const CourseName = ({ courseName }) => {
  return (
    <h2>{courseName}</h2>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map(course =>
        <ul>
          <CourseName key={course.id} courseName={course.name} />
          {course.parts.map(part =>
            <Part key={part.id} part={part} />
          )}
          <Total parts={course.parts}/>
        </ul>
      )}
    </div>
  )
}

export default Courses