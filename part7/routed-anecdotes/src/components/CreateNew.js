import { useField } from "../hooks"

const CreateNew = (props) => {

  const content = useField("text")
  const author = useField("text")
  const info = useField("text")


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={(e) => content.onChange(e)} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={(e) => author.onChange(e)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={(e)=> info.onChange(e)} />
        </div>
        <button>create</button>
        <button type="button" onClick={resetFields}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew