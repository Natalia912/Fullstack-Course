import { useEffect, useState } from "react"
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const get = async () => {
    const result = await axios.get(baseUrl)

    return result.data
  }

  const create = async (resource) => {
    const result =  await axios.post(baseUrl, resource)
    setResources((prev) => [...prev, resource])
    return result.data
  }

  useEffect(() => {
    get().then((data) => setResources(data))
  }, [])

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource