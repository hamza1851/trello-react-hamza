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

  const handleCreate = () => {
    onCreate({
      name: newBoardName,
    })
    setNewBoardName("")
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
