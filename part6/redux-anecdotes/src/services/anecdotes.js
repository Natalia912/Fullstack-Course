import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

const createNew = async (content) => {
  const anecdote = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, anecdote)

  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)

  return response.data
}

const voteById = async (id) => {
  const votedAnecdote = await getById(id)
  const voted = await axios.put(`${baseUrl}/${id}`, {
    ...votedAnecdote,
    votes: votedAnecdote.votes + 1
  })

  return voted.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, voteById }