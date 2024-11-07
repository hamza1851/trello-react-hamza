import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN
const URL = import.meta.env.VITE_URL

const API_URL = `${URL}members/me/boards?key=${API_KEY}&token=${TOKEN}`

// Fetch Boards
export const fetchBoards = async (navigate) => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

// Create Board
export const createBoard = async (newBoardData, navigate) => {
  try {
    const response = await axios.post(`${URL}boards/`, null, {
      params: {
        name: newBoardData.name,
        key: API_KEY,
        token: TOKEN,
      },
    })
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

export default { fetchBoards, createBoard }
