import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

const headers = {
  // prettier-ignore
  'Authorization': storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const deleteOne = async (object) => {
  await axios.delete(`${baseUrl}/${object}`, { headers })
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object, { headers })
  return request.data
}

const update = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data
}

export default { getAll, create, update, deleteOne }
