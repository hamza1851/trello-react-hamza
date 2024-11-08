import { configureStore } from "@reduxjs/toolkit"
import boardReducer from "../Features/Board/boardSlice"

const store = configureStore({
  reducer: {
    boards: boardReducer,
  },
})
export default store
