import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {
  addCardURL,
  deleteCardURL,
  fetchCardsURL,
} from "../../Services/API/lists"

// List Cards Operations

export const fetchCards = createAsyncThunk(
  "listCards/fectchCards",
  async (listId, { rejectWithValue }) => {
    try {
      const response = await axios.get(fetchCardsURL(listId))
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

    try {
      const response = await axios.post(addCardURL({ listId, cardName }))
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
    try {
      await axios.delete(deleteCardURL(cardId))
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
    listCards: {},
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
        const listId = action.meta.arg
        state.listCards[listId] = action.payload
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
        const listId = action.meta.arg
        state.listCards[listId] = action.payload
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
        const listId = action.payload
        delete state.listCards[listId]
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default listCards.reducer
