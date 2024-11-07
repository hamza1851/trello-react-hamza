import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import CreateBoardDialogue from "./CreateBoardDialogue"
import BoardList from "./BoardList"
import AddBoard from "./AddBoard"
import { fetchBoards, createBoard } from "../../Api-Calls/boardsCRUD"
import { useNavigate } from "react-router-dom"

const Boards = () => {
  const [boards, setBoards] = useState([])
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const loadBoards = async () => {
      const boardsData = await fetchBoards(navigate)
      setBoards(boardsData)
    }
    loadBoards()
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateBoard = async () => {
    await createBoard()
    const boardsData = await fetchBoards(navigate)
    setBoards(boardsData)
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
