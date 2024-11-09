import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import {
  addCheckList,
  deleteCheckList,
  getCheckLists,
} from "../../Features/CheckLists/checkListSlice"

import CheckListItem from "./CheckListItem"
import Spinner from "../Spinner"

const CheckList = ({ card }) => {
  const dispatch = useDispatch()
  const { checklist, status } = useSelector((state) => state.checkLists)
  const [checkListName, setCheckListName] = useState("")
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCheckLists(card.id))
  }, [card.id])

  const handleCloseAddList = () => {
    setOpen(false)
    setCheckListName("")
  }

  const handleAddList = async () => {
    if (!checkListName) return

    dispatch(addCheckList({ cardId: card.id, checkListName }))
    handleCloseAddList()
  }

  const handleDeleteCheckList = async (list) => {
    dispatch(deleteCheckList({ cardId: card.id, listId: list.id }))
  }

  if (status === "loading") return <Spinner />
  if (status === "failed") {
    navigate("/error")
    return
  }

  return (
    <div style={{ width: "500px" }}>
      {checklist.map((list) => (
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
