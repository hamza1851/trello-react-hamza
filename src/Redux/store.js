import { configureStore } from "@reduxjs/toolkit"
import boardReducer from "../Features/Board/boardSlice"
import listReducer from "../Features/List/listSlice"
import listCardReducer from "../Features/List/listCardSlice"
import checkListreducer from "../Features/CheckLists/checkListSlice"
import checklistItemsReducer from "../Features/CheckLists/checkListItemSlice"

const store = configureStore({
  reducer: {
    boards: boardReducer,
    lists: listReducer,
    listCards: listCardReducer,
    checkLists: checkListreducer,
    checklistItems: checklistItemsReducer,
  },
})
export default store
