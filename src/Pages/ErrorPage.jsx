import React from "react"
import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const ErrorPage = ({ errorMessage = "Something went wrong!" }) => {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate("/")
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f5f5f5"
    >
      <Typography variant="h2" color="error" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h5" color="textSecondary">
        {errorMessage}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackToHome}
        sx={{ mt: 4 }}
      >
        Back to Home
      </Button>
    </Box>
  )
}

export default ErrorPage
