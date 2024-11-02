import React from "react"
import { Box, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const BoardList = ({ boards }) => {
  const navigate = useNavigate()

  return (
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
              backgroundColor: prefs.backgroundColor || "grey.300",
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
    </Box>
  )
}

export default BoardList
