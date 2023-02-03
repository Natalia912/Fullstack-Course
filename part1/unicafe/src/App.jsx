import { useState } from 'react'
import './App.css'

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return (
    <section className='statistics'>
        <h2>statistics</h2>
        <div className='buttons'>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {all}</p>
          <p>average {average ? average : 0}</p>
          <p>positive {positive ? positive : 0}%</p>
        </div>
      </section>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const average = (good - bad)/all;
  const positive = good / all;

  return (
    <div className="App">
      <section className='feedback'>
        <h2>give feedback</h2>
        <div className='buttons'>
          <button onClick={() => setGood(prev => prev + 1)}>good</button>
          <button onClick={() => setNeutral(prev => prev + 1)}>neutral</button>
          <button onClick={() => setBad(prev => prev + 1)}>bad</button>
        </div>
      </section>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
