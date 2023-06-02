import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification} from '../reducers/notificationReducer'



const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    dispatch(createNewAnecdote(event.target.anecdote.value))
    dispatch(setNotification(`you created "${event.target.anecdote.value}"`))
    setTimeout(() => {dispatch(unsetNotification())}, 5000)
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