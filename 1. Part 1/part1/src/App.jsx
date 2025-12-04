const Header = (props) => {
  // Consts

  // console.log
  console.log(props)
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Content = (props) => {
  // Consts

  return (
    <div>
      <h2>
        Content:
      </h2>
      {props.parts.map((part, index) => (
        <p key={index}>
          Part {index +1}: {part.name} <br />
          Exercies: {part.exercises}
        </p>
      ))}
    </div>
  )
}

const Total = (props) => {
  // Consts
  let y = 0
  props.parts.forEach(part => {
    y = y + part.exercises
  })

  return (
    <h3>Total exercies: {y}</h3>
  )
}

const App = () => {
  // Consts
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App