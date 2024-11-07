import axios from "axios"

const API_URL = `${import.meta.env.VITE_URL}members/me/boards?key=${
  import.meta.env.VITE_API_KEY
}&token=${import.meta.env.VITE_API_TOKEN}`

// Fetch Boards
export const fetchBoards = async (navigate) => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    // console.error("Error fetching boards data:", error)
    navigate("./error")
  }
}

// Create Board
export const createBoard = async (navigate) => {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/boards/`,
      null,
      {
        params: {
          name: newBoardData.name,
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_API_TOKEN,
        },
      }
    )
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

export default { fetchBoards, createBoard }
