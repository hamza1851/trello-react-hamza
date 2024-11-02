import React, { useState, useEffect } from "react"
import { Box, Paper, Typography } from "@mui/material"
import axios from "axios"
import CreateBoardDialogue from "./CreateBoardDialogue"
import { useNavigate } from "react-router-dom"

const Boards = () => {
  const [boards, setBoards] = useState([])
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}members/me/boards?key=${
          import.meta.env.VITE_API_KEY
        }&token=${import.meta.env.VITE_API_TOKEN}`
      )
      setBoards(response.data)
    } catch (error) {
      console.error("Error fetching boards data:", error)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateBoard = async (newBoardData) => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/boards/`,
        null,
        {
          params: {
            name: newBoardData.name,
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_API_TOKEN,
          },
        }
      )

      console.log(response)

      // Refresh boards list after successful creation
      await fetchBoards()

      // Close the dialog
      handleClose()
    } catch (error) {
      console.error("Error creating board:", error)
    }
  }

  return (
    <>
      <Box sx={{ padding: "20px", maxWidth: "1240px", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "flex-start",
          }}
        >
          {boards.map(({ id, name, prefs }) => (
            <Box
              key={id}
              onClick={() => navigate(`/${id}`)}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.33% - 16px)",
                },
                cursor: "pointer",
              }}
            >
              <Paper
                sx={{
                  textAlign: "center",
                  minHeight: { xs: "400px", sm: "250px" },
                  backgroundImage: prefs.backgroundImage
                    ? `url(${prefs.backgroundImage})`
                    : "none",
                  backgroundColor: prefs.backgroundColor || "grey.300", // Fallback color if no image
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: prefs.textColor || "white",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: "transparent",
                    padding: "5px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {name}
                </Typography>
              </Paper>
            </Box>
          ))}

          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(33.33% - 16px)",
              },
              cursor: "pointer",
            }}
            onClick={handleClickOpen}
          >
            <Paper
              sx={{
                minHeight: { xs: "400px", sm: "250px" },
                backgroundColor: "grey.300",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "grey.400",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="h6">+</Typography>
                <Typography variant="subtitle1">Add Board</Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
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
