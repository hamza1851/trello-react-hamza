import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN

const getCheckLists = async (cardId, navigate) => {
  const url = `https://api.trello.com/1/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

const deleteCheckList = async (cardId, listId, navigate) => {
  const url = `https://api.trello.com/1/cards/${cardId}/checklists/${listId}?key=${API_KEY}&token=${TOKEN}`
  try {
    await axios.delete(url)
  } catch (error) {
    navigate("./error")
  }
}

const addCheckList = async (cardId, checkListName, navigate) => {
  const url = `https://api.trello.com/1/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
  try {
    const response = await axios.post(url, { name: checkListName })
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

// Checklist Items API functions

const getCheckItems = async (checkListId, navigate) => {
  const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${API_KEY}&token=${TOKEN}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

const addCheckItem = async (checkListId, itemName, navigate) => {
  const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${itemName}&key=${API_KEY}&token=${TOKEN}`
  try {
    const response = await axios.post(url)
    return response.data
  } catch (error) {
    navigate("./error")
  }
}

const deleteCheckItem = async (checkListId, itemId, navigate) => {
  const url = `https://api.trello.com/1/checklists/${checkListId}/checkItems/${itemId}?key=${API_KEY}&token=${TOKEN}`
  try {
    await axios.delete(url)
  } catch (error) {
    navigate("./error")
  }
}

const updateCheckItemState = async (cardId, itemId, state, navigate) => {
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
    navigate("./error")
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
