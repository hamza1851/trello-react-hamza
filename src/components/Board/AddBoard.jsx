import React from "react"
import { Box, Paper, Typography } from "@mui/material"

const AddBoard = ({ onClick }) => {
  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "calc(50% - 12px)",
          md: "calc(33.33% - 16px)",
        },
        cursor: "pointer",
      }}
      onClick={onClick}
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
  )
}

export default AddBoard
