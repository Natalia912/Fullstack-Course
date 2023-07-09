import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import BirthYear from "./BirthYear"
import { useMemo } from "react"

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)
  const authorsNames = useMemo(() => result.data?.allAuthors.map(a => ({value: a.name, label: a.name})), [result.data])

  console.log(authorsNames)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <p>loading</p>
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data?.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Update Author</h2>
      {result.data?.allAuthors && <BirthYear authorsNames={authorsNames} /> }
    </div>
  )
}

export default Authors
