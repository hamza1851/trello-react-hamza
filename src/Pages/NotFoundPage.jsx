// src/components/NotFound.jsx
import React from "react"
import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f7f9fc"
    >
      <Typography variant="h3" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  )
}

export default NotFound
