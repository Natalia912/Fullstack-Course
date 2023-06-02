import { useSelector, useDispatch } from 'react-redux'
import { changeVote } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state
            .anecdotes
            .filter(note => note.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(changeVote(id))
    const voted = anecdotes.find(item => item.id === id)
    dispatch(setNotification(`you voted "${voted.content}"`))
    setTimeout(() => {dispatch(unsetNotification())}, 5000)
  }

  return (
    <>
      {anecdotes
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList