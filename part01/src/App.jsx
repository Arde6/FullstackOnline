import { useState } from 'react'

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
  )
}

const Statistics = ({ feedback }) => {
  const all = Object.values(feedback).reduce((sum, value) => sum + value, 0)
  const sum = feedback.good - feedback.bad
  const avg = sum / all
  const percentage = feedback.good / all * 100

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
          Statistics
        </h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={feedback.good} />
            <StatisticsLine text="neutral" value={feedback.neutral} />
            <StatisticsLine text="bad" value={feedback.bad} />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="average" value={avg} />
            <StatisticsLine text="positives" value={percentage} /> 
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * 7))

  const handleClickAnecdote = () => {
    setSelected(Math.floor(Math.random() * 7))
    // console.log(selected)
  }

  const n = anecdotes.length
  const [votes, setVotes] = useState(Array(n).fill(0))

  const maxIndex = votes.reduce(
    (maxIndex, currentValue, currentIndex, array) =>
      currentValue > array[maxIndex] ? currentIndex : maxIndex, 0
  )

  const handleClickVote = () => {
    const copy_votes = [...votes]
    copy_votes[selected] += 1
    setVotes(copy_votes)
  }
  
 

  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0})

  const handleClickFeedback = (type) => {
    setFeedback({ ...feedback, [type]: feedback[type] + 1 })
  }

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <button onClick={() => handleClickFeedback('good')}>Good</button>
        <button onClick={() => handleClickFeedback('neutral')}>Neutral</button>
        <button onClick={() => handleClickFeedback('bad')}>Bad</button>
        <Statistics feedback={feedback}/>
      </div>
      <br/>
      <div>
        <h1>Anecdote of the day</h1>
        <button onClick={() => handleClickVote()}>Vote</button>
        <button onClick={() => handleClickAnecdote()}>Random anecdote</button>
        <p> {anecdotes[selected]} </p>
        <p> Votes: {votes[selected]} </p>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p> {anecdotes[maxIndex]} </p>
      </div>
    </div>
  )
}

export default App