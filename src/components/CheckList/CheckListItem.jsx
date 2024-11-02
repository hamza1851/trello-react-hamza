// CheckListItem.jsx
import React, { useEffect, useState } from "react"
import {
  Box,
  Checkbox,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  getCheckItems,
  addCheckItem,
  deleteCheckItem,
  updateCheckItemState,
} from "../../Api-Calls/checklistAPI"

const CheckListItem = ({ checkList }) => {
  const [checkItems, setCheckItems] = useState([])
  const [newCheckItem, setNewCheckItem] = useState("")
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchCheckItems = async () => {
      setLoading(true)
      try {
        const items = await getCheckItems(checkList.id)
        setCheckItems(items)
      } catch (error) {
        console.error("Error fetching check items:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCheckItems()
  }, [checkList.id])

  const handleAddCheckItem = async () => {
    if (!newCheckItem) return

    try {
      const addedItem = await addCheckItem(checkList.id, newCheckItem)
      setCheckItems((prev) => [...prev, addedItem])
      setNewCheckItem("")
      setOpen((prev) => !prev)
    } catch (error) {
      console.error("Error adding checklist item:", error)
    }
  }

  const handleDeleteCheckItem = async (itemId) => {
    try {
      await deleteCheckItem(checkList.id, itemId)
      setCheckItems((prev) => prev.filter((item) => item.id !== itemId))
    } catch (error) {
      console.error("Error deleting checklist item:", error)
    }
  }

  const handleCheckItemStateChange = async (itemId, currentState) => {
    console.log(currentState)
    const newState = currentState === "complete" ? "incomplete" : "complete"

    try {
      await updateCheckItemState(checkList.idCard, itemId, newState)
      setCheckItems((prev) =>
        prev.map((item) => {
          if (item.id === itemId) {
            return { ...item, state: newState }
          }
          return item
        })
      )
    } catch (error) {
      console.error("Error updating checklist item state:", error)
    }
  }

  return (
    <Box>
      {loading && <LinearProgress />}
      {checkItems.map((item) => (
        <Box key={item.id} display="flex" alignItems="center" mb={1}>
          <Checkbox
            checked={item.state === "complete"}
            onChange={() => handleCheckItemStateChange(item.id, item.state)}
          />
          <span
            style={{
              textDecoration:
                item.state === "complete" ? "line-through" : "none",
            }}
          >
            {item.name}
          </span>
          <Button
            onClick={() => handleDeleteCheckItem(item.id)}
            color="error"
            sx={{ minWidth: "auto" }}
          >
            <DeleteIcon />
          </Button>
        </Box>
      ))}
      <Button variant="outlined" onClick={() => setOpen(true)}>
        + Add Item
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Checklist Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            fullWidth
            variant="standard"
            value={newCheckItem}
            onChange={(e) => setNewCheckItem(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCheckItem}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CheckListItem
