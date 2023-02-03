import { useState } from 'react'
import './App.css'

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return (
    <section className='statistics'>
        <h2>statistics</h2>
        {all > 0 ? (
          <ul className='list'>
            <StatisticLine value={good} text={"good"} />
            <StatisticLine value={neutral} text={"neutral"} />
            <StatisticLine value={bad} text={"bad"} />
            <StatisticLine value={all} text={"all"} />
            <StatisticLine value={average} text={"average"} />
            <StatisticLine value={positive} text={"positive"} />
            
          </ul>
        ) :
        <p>No feedback given</p>}
        
      </section>
  )
}

const Button = ({setState, text}) => <button onClick={setState}>{text}</button>


const StatisticLine = ({value, text}) => <li>{text} {value ? value : 0}{text === "positive" && '%'}</li>


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
          <Button setState={() => setGood(prev => prev + 1)} text={"good"}/>
          <Button setState={() => setNeutral(prev => prev + 1)} text={"neutral"}/>
          <Button setState={() => setBad(prev => prev + 1)} text={"bad"}/>
        </div>
      </section>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
