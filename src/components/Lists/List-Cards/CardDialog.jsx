import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"
import CheckList from "../../CheckList/CheckList"

const CardDialog = ({ open, onClose, card }) => {
  if (!card) return null

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Checklist for {card.name}</DialogTitle>
      <DialogContent>
        <CheckList card={card} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CardDialog
