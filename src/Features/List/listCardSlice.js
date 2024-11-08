import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN
const URL = import.meta.env.VITE_URL

// List Cards Operations

export const fetchCards = createAsyncThunk(
  "listCards/fectchCards",
  async (listId, { rejectWithValue }) => {
    try {
      const url = `${URL}lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

export const addCard = createAsyncThunk(
  "listCards/addCard",
  async ({ listId, cardName }, { rejectWithValue }) => {
    if (!cardName) return

    const url = `${URL}cards?idList=${listId}&key=${API_KEY}&token=${TOKEN}`
    try {
      const response = await axios.post(url, { name: cardName })
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

export const deleteCard = createAsyncThunk(
  "listCards/deleteCard",
  async (cardId, { rejectWithValue }) => {
    const url = `${URL}cards/${cardId}?key=${API_KEY}&token=${TOKEN}`
    try {
      await axios.delete(url)
      return cardId
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

const listCards = createSlice({
  name: "listCards",
  initialState: {
    listCards: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.listCards = action.payload
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(addCard.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.listCards.push(action.payload)
      })
      .addCase(addCard.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(deleteCard.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.listCards = state.listCards.filter(
          (card) => card.id !== action.payload
        )
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default listCards.reducer
