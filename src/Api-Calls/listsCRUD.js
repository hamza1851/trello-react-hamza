import axios from "axios"

// Fetch Lists
export const fetchLists = async (boardID) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${boardID}/lists?key=${
        import.meta.env.VITE_API_KEY
      }&token=${import.meta.env.VITE_API_TOKEN}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching lists:", error)
  }
}

// Create List
export const createList = async (boardID, listName) => {
  const url = `https://api.trello.com/1/lists?key=${
    import.meta.env.VITE_API_KEY
  }&token=${import.meta.env.VITE_API_TOKEN}`
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

// Delete List
export const deleteList = async (listId) => {
  const deleteUrl = `https://api.trello.com/1/lists/${listId}/closed?key=${
    import.meta.env.VITE_API_KEY
  }&token=${import.meta.env.VITE_API_TOKEN}`
  try {
    await axios.put(deleteUrl, { value: true })
  } catch (error) {
    console.error("Error while deleting a list:", error)
  }
}

// Fetch Cards in a List
export const fetchCards = async (listId) => {
  try {
    const url = `https://api.trello.com/1/lists/${listId}/cards?key=${
      import.meta.env.VITE_API_KEY
    }&token=${import.meta.env.VITE_API_TOKEN}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error("Error while displaying cards", error)
  }
}

// Add a Card to a List
export const addCard = async (listId, cardName) => {
  if (!cardName) return

  const url = `https://api.trello.com/1/cards?idList=${listId}&key=${
    import.meta.env.VITE_API_KEY
  }&token=${import.meta.env.VITE_API_TOKEN}`
  try {
    const response = await axios.post(url, { name: cardName })
    return response.data
  } catch (error) {
    console.error("Error while adding a card", error)
  }
}

// Delete Card from a List
export const deleteCard = async (cardId) => {
  const url = `https://api.trello.com/1/cards/${cardId}?key=${
    import.meta.env.VITE_API_KEY
  }&token=${import.meta.env.VITE_API_TOKEN}`
  try {
    await axios.delete(url)
  } catch (error) {
    console.error("Error while deleting a card", error)
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
