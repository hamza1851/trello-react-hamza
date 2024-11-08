import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN
const URL = import.meta.env.VITE_URL

// List Operations

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (boardID, { rejectWithValue }) => {
    const url = `${URL}boards/${boardID}/lists?key=${API_KEY}&token=${TOKEN}`

    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

export const createList = createAsyncThunk(
  "lists/createList",
  async ({ boardID, listName }, { rejectWithValue }) => {
    const url = `${URL}lists?key=${API_KEY}&token=${TOKEN}`
    try {
      const response = await axios.post(url, {
        name: listName,
        idBoard: boardID,
      })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (listId, { rejectWithValue }) => {
    const url = `${URL}lists/${listId}/closed?key=${API_KEY}&token=${TOKEN}`
    try {
      await axios.put(url, { value: true })
      return listId
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

const listSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.lists = action.payload
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(createList.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.lists.push(action.payload)
      })
      .addCase(createList.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(deleteList.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.lists = state.lists.filter((list) => list.id !== action.payload)
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default listSlice.reducer
