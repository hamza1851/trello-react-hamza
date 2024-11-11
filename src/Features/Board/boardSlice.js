import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { createBoardURL, fetchBoardsURL } from "../../Services/API/board"

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(fetchBoardsURL())
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createBoard = createAsyncThunk(
  "boards/createBoards",
  async (newBoardData, { rejectWithValue }) => {
    try {
      const response = await axios.post(createBoardURL(newBoardData))
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const boardSlice = createSlice({
  name: "baords",
  initialState: {
    boards: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.boards = action.payload
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(createBoard.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.boards.push(action.payload)
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default boardSlice.reducer
