import { useState,useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthYear = ({ authorsNames }) => {
  const [name, setName] = useState(authorsNames[0].value)
  const [born, setBorn] = useState('')

  const [error, setError] = useState(null)

  const [ updateAuthor, result ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      setError(messages)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('author not found')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name: name.value, born }})
    

    setName('')
    setBorn('')
  }

  return (
    <div>
      {error && <p style={{color: "red"}}>{error}</p>}
      <form onSubmit={submit}>
        <div>
         <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={name}
          onChange={setName}
          isClearable
          isSearchable
          name="author"
          options={authorsNames}
        />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthYear