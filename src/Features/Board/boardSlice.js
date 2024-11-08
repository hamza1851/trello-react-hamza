import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN
const URL = import.meta.env.VITE_URL

const API_URL = `${URL}members/me/boards?key=${API_KEY}&token=${TOKEN}`

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL)
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
      const response = await axios.post(`${URL}boards/`, null, {
        params: {
          name: newBoardData.name,
          key: API_KEY,
          token: TOKEN,
        },
      })
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
