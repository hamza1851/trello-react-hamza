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
  CircularProgress,
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  getCheckItems,
  addCheckItem,
  deleteCheckItem,
  updateCheckItemState,
} from "../../Api-Calls/checklistAPI"

const CheckListItem = ({ checkList, navigate }) => {
  const [checkItems, setCheckItems] = useState([])
  const [newCheckItem, setNewCheckItem] = useState("")
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fetchCheckItems = async () => {
      setLoading(true)
      try {
        const items = await getCheckItems(checkList.id, navigate)
        setCheckItems(items)
        updateProgress(items)
      } catch (error) {
        console.error("Error fetching check items:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCheckItems()
  }, [checkList.id])

  const updateProgress = (items) => {
    const completedItems = items.filter(
      (item) => item.state === "complete"
    ).length
    const totalItems = items.length
    const progress = totalItems ? (completedItems / totalItems) * 100 : 0
    setProgress(progress)
  }

  const handleAddCheckItem = async () => {
    if (!newCheckItem) return

    try {
      const addedItem = await addCheckItem(checkList.id, newCheckItem, navigate)
      setCheckItems((prev) => [...prev, addedItem])
      updateProgress([...checkItems, addedItem])
      setNewCheckItem("")
      setOpen(false)
    } catch (error) {
      console.error("Error adding checklist item:", error)
    }
  }

  const handleDeleteCheckItem = async (itemId) => {
    try {
      await deleteCheckItem(checkList.id, itemId, navigate)
      const updatedItems = checkItems.filter((item) => item.id !== itemId)
      setCheckItems(updatedItems)
      updateProgress(updatedItems)
    } catch (error) {
      console.error("Error deleting checklist item:", error)
    }
  }

  const handleCheckItemStateChange = async (itemId, currentState) => {
    const newState = currentState === "complete" ? "incomplete" : "complete"

    try {
      await updateCheckItemState(checkList.idCard, itemId, newState, navigate)
      const updatedItems = checkItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, state: newState }
        }
        return item
      })
      setCheckItems(updatedItems)
      updateProgress(updatedItems)
    } catch (error) {
      console.error("Error updating checklist item state:", error)
    }
  }

  return (
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="body2" sx={{ minWidth: "50px" }}>
            {Math.round(progress)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: "100%",
              ml: 1,
              bgcolor: "#81C784", // lighter green background color
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4CAF50", // darker green for progress
              },
            }}
          />
        </Box>
      )}

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
