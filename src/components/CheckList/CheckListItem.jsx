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
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch, useSelector } from "react-redux"
import {
  addCheckItem,
  deleteCheckItem,
  getCheckItems,
  updateCheckItemState,
} from "../../Features/CheckLists/checkListItemSlice"
import Spinner from "../Spinner"
import { useNavigate } from "react-router-dom"

const CheckListItem = ({ checkList }) => {
  const dispatch = useDispatch()
  const { checklistItem, status } = useSelector((state) => state.checklistItems)
  const [newCheckItem, setNewCheckItem] = useState("")
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCheckItems(checkList.id))
  }, [checkList.id, dispatch])

  useEffect(() => {
    if (checklistItem[checkList.id]?.length) {
      updateProgress(checklistItem[checkList.id])
    }
  }, [checklistItem[checkList.id]])

  const updateProgress = (items) => {
    const completedItems = items.filter(
      (item) => item.state === "complete"
    ).length
    const totalItems = items.length
    const progress = totalItems ? (completedItems / totalItems) * 100 : 0
    setProgress(progress)
  }

  const handleAddCheckItem = () => {
    if (!newCheckItem) return
    dispatch(
      addCheckItem({ checkListId: checkList.id, itemName: newCheckItem })
    ).then(() => dispatch(getCheckItems(checkList.id)))

    setNewCheckItem("")
    setOpen(false)
  }

  const handleDeleteCheckItem = (itemId) => {
    dispatch(deleteCheckItem({ checkListId: checkList.id, itemId })).then(() =>
      dispatch(getCheckItems(checkList.id))
    )
  }

  const handleCheckItemStateChange = (itemId, currentState) => {
    const newState = currentState === "complete" ? "incomplete" : "complete"
    dispatch(
      updateCheckItemState({
        cardId: checkList.idCard,
        itemId,
        state: newState,
      })
    ).then(() => dispatch(getCheckItems(checkList.id)))
  }

  if (status === "loading") return <Spinner />
  if (status === "failed") {
    navigate("/error")
    return null
  }

  return (
    <Box>
      {checklistItem[checkList.id]?.length > 0 && (
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
              bgcolor: "#81C784",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4CAF50",
              },
            }}
          />
        </Box>
      )}

      {checklistItem[checkList.id]?.map((item) => (
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
            sx={{ marginLeft: "auto" }}
            onClick={() => handleDeleteCheckItem(item.id)}
          >
            <DeleteIcon />
          </Button>
        </Box>
      ))}

      <Button onClick={() => setOpen(true)} variant="outlined">
        Add New Item
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Check Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            value={newCheckItem}
            onChange={(e) => setNewCheckItem(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddCheckItem}
            color="primary"
            disabled={!newCheckItem}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CheckListItem
