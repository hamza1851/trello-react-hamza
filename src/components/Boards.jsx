import React, { useState, useEffect } from "react"
import { Box, Paper, Typography, Grid } from "@mui/material"
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
        <Grid container spacing={3} wrap="wrap" justifyContent="flex-start">
          {boards.map(({ id, name, prefs }) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={id}
              onClick={() => navigate(`/${id}`)}
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
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                minHeight: { xs: "400px", sm: "250px" },
                backgroundColor: "grey.300",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: "black",
                "&:hover": {
                  backgroundColor: "grey.400",
                },
              }}
              onClick={handleClickOpen}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="h6">+</Typography>
                <Typography variant="subtitle1">Add Board</Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
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
