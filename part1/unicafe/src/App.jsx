import { useState } from 'react'
import './App.css'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <section className='statistics'>
        <h2>statistics</h2>
        <div className='buttons'>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
        </div>
      </section>
    </div>
  )
}

export default App
