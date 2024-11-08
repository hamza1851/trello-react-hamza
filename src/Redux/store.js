import { configureStore } from "@reduxjs/toolkit"
import boardReducer from "../Features/Board/boardSlice"
import listReducer from "../Features/List/listSlice"
import listCardReducer from "../Features/List/listCardSlice"

const store = configureStore({
  reducer: {
    boards: boardReducer,
    lists: listReducer,
    listCards: listCardReducer,
  },
})
export default store
