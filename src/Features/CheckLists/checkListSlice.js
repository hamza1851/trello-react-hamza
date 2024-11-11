import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {
  addCheckListURL,
  deleteCheckListURL,
  fetchCheckListURL,
} from "../../Services/API/checkLists"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN
const URL = import.meta.env.VITE_URL

export const getCheckLists = createAsyncThunk(
  "checklist/getCheckLists",
  async (cardId, { rejectWithValue }) => {
    // const url = `${URL}cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
    try {
      const response = await axios.get(fetchCheckListURL(cardId))
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

export const deleteCheckList = createAsyncThunk(
  "checlist/deleteCheclist",
  async ({ cardId, listId }, { rejectWithValue }) => {
    // const url = `${URL}cards/${cardId}/checklists/${listId}?key=${API_KEY}&token=${TOKEN}`
    try {
      await axios.delete(deleteCheckListURL({ cardId, listId }))
      return listId
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

export const addCheckList = createAsyncThunk(
  "checklsit/addCheckList",
  async ({ cardId, checkListName }, { rejectWithValue }) => {
    try {
      const response = await axios.post(addCheckListURL({cardId, checkListName}))
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

const checkLists = createSlice({
  name: "checkLists",
  initialState: {
    checklist: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCheckLists.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getCheckLists.fulfilled, (state, action) => {
        state.status = "secceeded"
        state.checklist = action.payload
      })
      .addCase(getCheckLists.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(addCheckList.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addCheckList.fulfilled, (state, action) => {
        state.status = "secceeded"
        state.checklist.push(action.payload)
      })
      .addCase(addCheckList.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(deleteCheckList.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteCheckList.fulfilled, (state, action) => {
        state.status = "secceeded"
        state.checklist = state.checklist.filter(
          (item) => item.id !== action.payload
        )
      })
      .addCase(deleteCheckList.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default checkLists.reducer
