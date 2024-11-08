import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import CreateBoardDialogue from "./CreateBoardDialogue"
import BoardList from "./BoardList"
import AddBoard from "./AddBoard"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../Spinner"
import { useNavigate } from "react-router-dom"
import { createBoard, fetchBoards } from "../../Features/Board/boardSlice"

const Boards = () => {
  const dispatch = useDispatch()
  const { boards, status } = useSelector((state) => state.boards)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === "idle") dispatch(fetchBoards())
  }, [dispatch, status])

  if (status === "loading") return <Spinner />
  if (status === "failed") navigate("/error")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateBoard = (newBoardName) => {
    dispatch(createBoard(newBoardName))
    dispatch(fetchBoards())
    handleClose()
  }

  return (
    <>
      <Box sx={{ padding: "20px", maxWidth: "1240px", mx: "auto" }}>
        <BoardList boards={boards} />
        <AddBoard onClick={handleClickOpen} />
      </Box>

      <CreateBoardDialogue
        open={open}
        onClose={handleClose}
        onCreate={handleCreateBoard}
      />
    </>
  )
}

export default Boards
