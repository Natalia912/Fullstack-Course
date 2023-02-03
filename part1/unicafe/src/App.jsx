import { useState } from 'react'
import './App.css'

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return (
    <section className='statistics'>
        <h2>statistics</h2>
        {all > 0 ? (
          <ul className='list'>
          <li>good {good}</li>
          <li>neutral {neutral}</li>
          <li>bad {bad}</li>
          <li>all {all}</li>
          <li>average {average ? average : 0}</li>
          <li>positive {positive ? positive : 0}%</li>
        </ul>
        ) :
        <p>No feedback given</p>}
        
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
