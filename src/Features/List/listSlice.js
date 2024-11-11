import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {
  createListURL,
  deleteListURL,
  fetchListsURL,
} from "../../Services/API/lists"

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (boardID, { rejectWithValue }) => {
    try {
      const response = await axios.get(fetchListsURL(boardID))
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
    try {
      const response = await axios.post(createListURL({ boardID, listName }))
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
    try {
      await axios.put(deleteListURL(listId), { value: true })
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
        state.lists.unshift(action.payload)
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
