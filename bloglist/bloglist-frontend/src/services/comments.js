import axios from 'axios'
const baseUrl = '/api/comments'

const comment = async (blog, comment) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, comment)
  return response.data
}

export default comment
