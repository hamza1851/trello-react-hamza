import axios from "axios"

const API_URL = `${import.meta.env.VITE_URL}members/me/boards?key=${
  import.meta.env.VITE_API_KEY
}&token=${import.meta.env.VITE_API_TOKEN}`

export const fetchBoards = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error("Error fetching boards data:", error)
    throw error // Re-throw to handle in the component
  }
}

export const createBoard = async (newBoardData) => {
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
    console.error("Error creating board:", error)
    throw error // Re-throw to handle in the component
  }
}
