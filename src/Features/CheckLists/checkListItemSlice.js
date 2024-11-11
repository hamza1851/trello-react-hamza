import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {
  addCheckItemURL,
  deleteCheckItemURL,
  getCheckItemsURL,
  updateCheckItemStateURL,
} from "../../Services/API/checkLists"

export const getCheckItems = createAsyncThunk(
  "checkList/getChecklistItems",
  async (checkListId, { rejectWithValue }) => {
    try {
      const response = await axios.get(getCheckItemsURL(checkListId))
      return { data: response.data, checkListId }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

export const addCheckItem = createAsyncThunk(
  "checkList/addCheckItem",
  async ({ checkListId, itemName }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        addCheckItemURL({ checkListId, itemName })
      )
      return { data: response.data, checkListId }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

export const deleteCheckItem = createAsyncThunk(
  "checkList/deleteCheckItem",
  async ({ checkListId, itemId }, { rejectWithValue }) => {
    try {
      await axios.delete(deleteCheckItemURL({ checkListId, itemId }))
      return { checkListId, itemId }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

export const updateCheckItemState = createAsyncThunk(
  "checkList/updateCheckItemState",
  async ({ cardId, itemId, state }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        updateCheckItemStateURL({ cardId, itemId, state })
      )
      return { data: response.data, cardId, itemId, state }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)

const checklistItems = createSlice({
  name: "checklistItems",
  initialState: {
    checklistItem: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCheckItems.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getCheckItems.fulfilled, (state, action) => {
        state.status = "succeeded"
        const { checkListId, data } = action.payload
        state.checklistItem[checkListId] = data
      })
      .addCase(getCheckItems.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(addCheckItem.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addCheckItem.fulfilled, (state, action) => {
        state.status = "succeeded"
        const { checkListId, data } = action.payload
        if (!state.checklistItem[checkListId]) {
          state.checklistItem[checkListId] = []
        }
        state.checklistItem[checkListId].push(data)
      })
      .addCase(addCheckItem.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(deleteCheckItem.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deleteCheckItem.fulfilled, (state, action) => {
        state.status = "succeeded"
        const { checkListId, itemId } = action.payload
        if (state.checklistItem[checkListId]) {
          state.checklistItem[checkListId] = state.checklistItem[
            checkListId
          ].filter((item) => item.id !== itemId)
        }
      })
      .addCase(deleteCheckItem.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(updateCheckItemState.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateCheckItemState.fulfilled, (state, action) => {
        state.status = "succeeded"
        const { cardId, itemId, state: itemState } = action.payload
        const checklist = state.checklistItem[cardId]
        if (checklist) {
          const item = checklist.find((item) => item.id === itemId)
          if (item) {
            item.state = itemState
          }
        }
      })
      .addCase(updateCheckItemState.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default checklistItems.reducer
