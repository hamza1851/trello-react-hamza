import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN
const URL = import.meta.env.VITE_URL

// Fetch Lists
export const fetchLists = async (boardID, navigate) => {
  try {
    const response = await axios.get(
      `${URL}boards/${boardID}/lists?key=${API_KEY}&token=${TOKEN}`
    )
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

// Create List
export const createList = async (boardID, listName, navigate) => {
  const url = `${URL}lists?key=${API_KEY}&token=${TOKEN}`
  try {
    const response = await axios.post(url, {
      name: listName,
      idBoard: boardID,
    })
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

// Delete List
export const deleteList = async (listId, navigate) => {
  const deleteUrl = `${URL}lists/${listId}/closed?key=${API_KEY}&token=${TOKEN}`
  try {
    await axios.put(deleteUrl, { value: true })
  } catch (error) {
    navigate("./error")
  }
}

// Fetch Cards in a List
export const fetchCards = async (listId, navigate) => {
  try {
    const url = `${URL}lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

// Add a Card to a List
export const addCard = async (listId, cardName, navigate) => {
  if (!cardName) return

  const url = `${URL}cards?idList=${listId}&key=${API_KEY}&token=${TOKEN}`
  try {
    const response = await axios.post(url, { name: cardName })
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

// Delete Card from a List
export const deleteCard = async (cardId, navigate) => {
  const url = `${URL}cards/${cardId}?key=${API_KEY}&token=${TOKEN}`
  try {
    await axios.delete(url)
  } catch (error) {
    navigate("./error")
  }
}

export default {
  fetchLists,
  createList,
  deleteList,
  fetchCards,
  addCard,
  deleteCard,
}
