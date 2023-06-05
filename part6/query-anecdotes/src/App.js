import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import NotificationContext from './notificationContext'
import { useContext } from 'react'

const App = () => {

  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const setNotification = (type, message) => {
    dispatch({type, payload: message})
    console.log(message)
    setTimeout(() => dispatch({type: "UNSET"}), 5000)
  }


  const voteMutation = useMutation((anecdote) => {
    return axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, {
      ...anecdote,
      votes: anecdote.votes + 1
    }).then(req => req.data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      },
    }
  )

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
    setNotification("VOTED", anecdote.content)
  }

  const result = useQuery(
    'anecdotes',
    () => axios.get("http://localhost:3001/anecdotes").then(res => res.data),
    {
      retry: 1
    }
  )

  if (result.isLoading) {
    return <div>loading</div>
  }

  if (result.isError) {
    return <div>anecdote service is not available due to the error in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification text={notification} />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
