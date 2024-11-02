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
  }
}

// Lists CRUD
export const fetchLists = async (boardID) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${boardID}/lists?key=${api_key}&token=${token}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching lists:", error)
  }
}

export const deleteList = async (listId) => {
  const deleteUrl = `https://api.trello.com/1/lists/${listId}/closed?key=${api_key}&token=${token}`

  try {
    await axios.put(deleteUrl, { value: true })
  } catch (error) {
    console.error("Error while deleting a list:", error)
  }
}

export const createList = async (boardID, listName) => {
  const url = `https://api.trello.com/1/lists?key=${API_KEY}&token=${TOKEN}`

  try {
    const response = await axios.post(url, {
      name: listName,
      idBoard: boardID,
    })
    return response.data
  } catch (error) {
    throw new Error("Error while creating list: " + error.message)
  }
}
