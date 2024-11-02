import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckListItem from "./CheckListItem"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN

const CheckList = ({ card }) => {
  const [checkList, setCheckList] = useState([])
  const [checkListName, setCheckListName] = useState("")
  const [open, setOpen] = useState(false) // Define the `open` state

  useEffect(() => {
    const getCheckLists = async () => {
      const url = `https://api.trello.com/1/cards/${card.id}/checklists?key=${API_KEY}&token=${TOKEN}`
      try {
        const response = await axios.get(url)
        setCheckList(response.data)
      } catch (error) {
        console.error("Error occurred while fetching the Check List:", error)
      }
    }
    if (card.id) {
      getCheckLists()
    }
  }, [card.id])

  const handleDeleteCheckList = async (list) => {
    const url = `https://api.trello.com/1/cards/${card.id}/checklists/${list.id}?key=${API_KEY}&token=${TOKEN}`
    try {
      const response = await axios.delete(url)
      setCheckList((prev) => prev.filter((item) => item.id !== list.id))
    } catch (error) {
      throw new Error("Error while deleting checklist", error)
    }
  }

  const handleCloseAddList = () => {
    setOpen(false)
    setCheckListName("")
  }

  const handleAddList = async () => {
    if (!checkListName) return

    const url = `https://api.trello.com/1/cards/${card.id}/checklists?key=${API_KEY}&token=${TOKEN}`
    try {
      const response = await axios.post(url, { name: checkListName })
      setCheckList((prevCheckList) => [...prevCheckList, response.data])
      handleCloseAddList()
    } catch (error) {
      console.error("Error occurred while adding the Check List:", error)
    }
  }

  return (
    <div style={{ width: "500px" }}>
      {checkList.map((list) => (
        <div
          key={list.id}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
              {list.name}
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteCheckList(list)
              }}
              sx={{
                minWidth: "auto",
                padding: "6px",
                color: "#555",
                "&:hover": {
                  color: "#000",
                },
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
          <CheckListItem checkList={list} />
        </div>
      ))}
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          marginTop: "60px",
          color: "white",
          borderColor: "blue",
          padding: "10px 20px",
          backgroundColor: "blue",
          borderRadius: "25px",
          fontWeight: "bold",
          fontSize: "1rem",
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#3498db",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(52, 152, 219, 0.4)",
            borderColor: "#3498db",
          },
        }}
      >
        + Add a list
      </Button>

      <Dialog open={open} onClose={handleCloseAddList}>
        <DialogTitle>Add a list</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="board"
            label="List Name"
            fullWidth
            variant="standard"
            value={checkListName}
            onChange={(e) => setCheckListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddList}>Cancel</Button>
          <Button onClick={handleAddList} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CheckList
