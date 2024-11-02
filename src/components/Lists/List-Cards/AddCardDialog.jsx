import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material"

const AddCardDialog = ({ open, onClose, onAddCard }) => {
  const [cardName, setCardName] = useState("")

  const handleAddCard = () => {
    onAddCard(cardName)
    setCardName("")
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Card</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Card Name"
          fullWidth
          variant="standard"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddCard}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCardDialog
