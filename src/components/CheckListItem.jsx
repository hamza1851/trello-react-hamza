import React, { useEffect, useState } from "react"
import axios from "axios"
import Box from "@mui/joy/Box"
import Checkbox from "@mui/joy/Checkbox"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import LinearProgress from "@mui/material/LinearProgress"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN

const CheckListItem = ({ checkList }) => {
  const [checkItems, setCheckItems] = useState([])
  const [checkItemName, setCheckItemName] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const url = `https://api.trello.com/1/checklists/${checkList.id}/checkItems?key=${API_KEY}&token=${TOKEN}`
    const getCheckListsItems = async () => {
      try {
        const response = await axios.get(url)
        setCheckItems(response.data)
      } catch (error) {
        console.log("Error occurred while fetching checkItems", error)
      }
    }
    getCheckListsItems()
  }, [checkList.id])

  const handleCloseAddCheckItem = () => {
    setOpen(false)
  }

  const handleAddCheckItem = async () => {
    const url = `https://api.trello.com/1/checklists/${checkList.id}/checkItems?name=${checkItemName}&key=${API_KEY}&token=${TOKEN}`
    try {
      let res = await axios.post(url)
      setCheckItems((prev) => [...prev, res.data])
      setOpen(false)
      setCheckItemName("")
    } catch (error) {
      console.log("Error occurred while creating an item", error)
    }
  }

  const handleDeleteCheckItem = async (item) => {
    const url = `https://api.trello.com/1/checklists/${checkList.id}/checkItems/${item.id}?key=${API_KEY}&token=${TOKEN}`
    try {
      await axios.delete(url)
      setCheckItems((prev) =>
        prev.filter((checkItem) => checkItem.id !== item.id)
      )
    } catch (error) {
      console.log("Error while deleting check item", error)
    }
  }

  const handleCheckItemStateChange = async (item) => {
    const newState = item.state === "complete" ? "incomplete" : "complete"
    const url = `https://api.trello.com/1/cards/${checkList.idCard}/checkItem/${item.id}?state=${newState}&key=${API_KEY}&token=${TOKEN}`
    try {
      await axios.put(url)
      setCheckItems((prev) =>
        prev.map((checkItem) =>
          checkItem.id === item.id
            ? { ...checkItem, state: newState }
            : checkItem
        )
      )
    } catch (error) {
      console.log("Error while updating check item state", error)
    }
  }

  // Calculate progress percentage
  const completedCount = checkItems.filter(
    (item) => item.state === "complete"
  ).length
  const totalCount = checkItems.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "100%", marginBottom: "20px" }}>
        <LinearProgress variant="determinate" value={progress} />
        <p>{Math.round(progress)}% completed</p>
      </Box>

      {checkItems.map((item) => (
        <div key={item.id}>
          <Box
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              padding: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <Checkbox
                label={item.name}
                variant="outlined"
                checked={item.state === "complete"}
                onChange={() => handleCheckItemStateChange(item)}
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteCheckItem(item)
                }}
                sx={{
                  marginLeft: "15px",
                  padding: "0px",
                  minWidth: "auto",
                  color: "red",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          </Box>
        </div>
      ))}

      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          marginTop: "40px",
          width: "140px",
          color: "white",
          borderColor: "#22272b",
          padding: "5px 10px",
          backgroundColor: "#22272b",
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
        + Add item
      </Button>

      <Dialog open={open} onClose={handleCloseAddCheckItem}>
        <DialogTitle>Add an Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="item"
            label="Item Name"
            fullWidth
            variant="standard"
            value={checkItemName}
            onChange={(e) => setCheckItemName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddCheckItem}>Cancel</Button>
          <Button onClick={handleAddCheckItem} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CheckListItem
