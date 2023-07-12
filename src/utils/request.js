import axios from 'axios'

export const request = async (config) => {
  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}