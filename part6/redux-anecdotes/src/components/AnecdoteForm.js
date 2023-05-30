import { useDispatch } from 'react-redux'

import { createAnecdoteDispatch } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdoteDispatch(event.target.anecdote.value))
    event.target.anecdote.value = ""
  }
  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div><input name="anecdote"/></div>
          <button>create</button>
        </form>
    </div>
  )
}


export default AnecdoteForm