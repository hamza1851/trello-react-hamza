import React, { useEffect, useState } from "react"
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
import {
  getCheckLists,
  deleteCheckList,
  addCheckList,
} from "../../Api-Calls/checklistAPI"
import { useNavigate } from "react-router-dom"

const CheckList = ({ card }) => {
  const [checkList, setCheckList] = useState([])
  const [checkListName, setCheckListName] = useState("")
  const [open, setOpen] = useState(false)
  const naviagte = useNavigate()

  useEffect(() => {
    const fetchCheckLists = async () => {
      if (card.id) {
        try {
          const lists = await getCheckLists(card.id, naviagte)
          setCheckList(lists)
        } catch (error) {
          console.error("Error fetching checklists:", error)
        }
      }
    }
    fetchCheckLists()
  }, [card.id])

  const handleCloseAddList = () => {
    setOpen(false)
    setCheckListName("")
  }

  const handleAddList = async () => {
    if (!checkListName) return

    try {
      const newCheckList = await addCheckList(card.id, checkListName, naviagte)
      setCheckList((prev) => [...prev, newCheckList])
      handleCloseAddList()
    } catch (error) {
      console.error("Error adding checklist:", error)
    }
  }

  const handleDeleteCheckList = async (list) => {
    try {
      await deleteCheckList(card.id, list.id, naviagte)
      setCheckList((prev) => prev.filter((item) => item.id !== list.id))
    } catch (error) {
      console.error("Error deleting checklist:", error)
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
          <CheckListItem checkList={list} navigate={naviagte} />
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
