import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN

const getCheckLists = async (cardId) => {
  const url = `https://api.trello.com/1/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error("Error fetching checklists:", error)
  }
}

const deleteCheckList = async (cardId, listId) => {
  const url = `https://api.trello.com/1/cards/${cardId}/checklists/${listId}?key=${API_KEY}&token=${TOKEN}`
  try {
    await axios.delete(url)
  } catch (error) {
    console.error("Error deleting checklist:", error)
  }
}

const addCheckList = async (cardId, checkListName) => {
  const url = `https://api.trello.com/1/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
  try {
    const response = await axios.post(url, { name: checkListName })
    return response.data
  } catch (error) {
    console.error("Error adding checklist:", error)
  }
}

// Checklist Items API functions

const getCheckItems = async (checkListId) => {
  const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${API_KEY}&token=${TOKEN}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error("Error fetching checklist items:", error)
  }
}

const addCheckItem = async (checkListId, itemName) => {
  const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${itemName}&key=${API_KEY}&token=${TOKEN}`
  try {
    const response = await axios.post(url)
    return response.data
  } catch (error) {
    console.error("Error adding checklist item:", error)
  }
}

const deleteCheckItem = async (checkListId, itemId) => {
  const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems/${itemId}?key=${API_KEY}&token=${TOKEN}`
  try {
    await axios.delete(url)
  } catch (error) {
    console.error("Error deleting checklist item:", error)
  }
}

const updateCheckItemState = async (cardId, itemId, state) => {
  console.log(`CheckList id: ${cardId}`)
  console.log(`ItemID: ${itemId}`)
  const url = `https://api.trello.com/1/cards/${cardId}/checkItem/${itemId}`

  try {
    const response = await axios.put(
      url,
      { state },
      {
        params: {
          key: API_KEY,
          token: TOKEN,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error("Error updating checklist item state:", error)
  }
}

export {
  getCheckLists,
  deleteCheckList,
  addCheckList,
  getCheckItems,
  addCheckItem,
  deleteCheckItem,
  updateCheckItemState,
}
