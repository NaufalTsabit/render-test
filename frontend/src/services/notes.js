import axios from "axios"
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  const notExist = {
    id:1000,
    content: 'this note is not on server',
    important: true,
  }
  return request.then(response => {
    return response.data.concat(notExist)
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {
    return response.data
  })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => {
    return response.data
  })
}

export default {getAll, create, update}