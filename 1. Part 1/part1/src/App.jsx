import { useState } from 'react'

const Avarage = ( all, feedback ) => {
  const avg = 1
  return (
    <div>
      <p>
        avarage {avg}
      </p>
    </div>
  )
}

const DisplayStats = ({ feedback }) => {
  const all = Object.values(feedback).reduce((sum, value) => sum + value, 0)
  if (all === 0) {
    return (
      <div>
        <h1>
          statistics
        </h1>
        <p>
          No feedback given
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>
          statistics
        </h1>
        <p>
          good {feedback.good}
        </p>
        <p>
          neutral {feedback.neutral}
        </p>
        <p>
          bad {feedback.bad}
        </p>
        <p>
          all {all}
        </p>
        <Avarage all={all} feedback={feedback} />
      </div>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // const [good, setGood] = useState(0)
  // const [neutral, setNeutral] = useState(0)
  // const [bad, setBad] = useState(0)
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0})

  const handleClick = (type) => {
    setFeedback({ ...feedback, [type]: feedback[type] + 1 })
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleClick('good')}>Good</button>
      <button onClick={() => handleClick('neutral')}>Neutral</button>
      <button onClick={() => handleClick('bad')}>Bad</button>
      <DisplayStats feedback={feedback}/>
    </div>
  )
}

export default App