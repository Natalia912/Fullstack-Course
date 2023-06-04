import { useMutation, useQueryClient } from "react-query"
import axios from "axios"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newMutation = useMutation( (anecdote) => {
      return axios.post("http://localhost:3001/anecdotes", {
        content: anecdote.content,
        votes: 0
      }).then(res => res.data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      },
    }
  )

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newMutation.mutate({ content })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
