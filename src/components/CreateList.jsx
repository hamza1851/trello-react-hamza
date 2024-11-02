import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import axios from "axios"
import { useParams } from "react-router-dom"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN

const CreateList = ({ onCreateList }) => {
  const [open, setOpen] = useState(false)
  const [listName, setListName] = useState("")
  const { boardID } = useParams()

  const createNewList = async () => {
    const url = `https://api.trello.com/1/lists?name=${listName}&idBoard=${boardID}&key=${API_KEY}&token=${TOKEN}`

    try {
      if (!listName) return

      const response = await axios.post(url)
      setListName("")
      setOpen((prev) => !prev)
      onCreateList(response.data)
    } catch (error) {
      throw new Error("Error while creating list", error)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleInput = (e) => setListName(e.target.value)

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          width: "250px",
          flexShrink: "0",
          marginTop: "20px",
          marginLeft: "24px",
          padding: "12px 24px",
          minHeight: "48px",
          maxHeight: "60px",
          color: "#ffffff",
          borderColor: "#3a3f45",
          backgroundColor: "#3a3f45",
          borderRadius: "24px",
          fontWeight: 600,
          fontSize: "1.05rem",
          textTransform: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#272a2f",
            color: "#ffffff",
            boxShadow: "0 5px 10px rgba(50, 50, 50, 0.3)",
            borderColor: "#272a2f",
          },
        }}
      >
        + Add another list
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>list</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="lists"
            label="list Name"
            fullWidth
            variant="standard"
            value={listName}
            onChange={handleInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createNewList} type="submit">
            save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateList
