const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>votes: {anecdote.votes}</div>
      <div>for more info to see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

export default Anecdote