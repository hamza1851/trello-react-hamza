import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material"

const CreateBoardDialogue = ({ open, onClose, onCreate }) => {
  const [newBoardName, setNewBoardName] = useState("")
  const [backgroundColor, setBackgroundColor] = useState("#0079BF")
  const [textColor, setTextColor] = useState("#FFFFFF") 

  const handleCreate = () => {
    onCreate({
      name: newBoardName,
      backgroundColor,
      textColor,
    })
    setNewBoardName("")
    setBackgroundColor("#0079BF")
    setTextColor("#FFFFFF")
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a New Board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Board Name"
          fullWidth
          variant="outlined"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Background Color (hex)"
          fullWidth
          variant="outlined"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Text Color (hex)"
          fullWidth
          variant="outlined"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateBoardDialogue
