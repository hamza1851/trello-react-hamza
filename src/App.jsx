// App.jsx
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./Layouts/MainLayout"
import Boards from "./components/Boards"
import axios from "axios"
import { useState, useEffect } from "react"
import List from "./components/List"

function App() {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    const getBoardsData = async () => {
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
    getBoardsData()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Boards boards={boards} />} />
          <Route path="/:boardID" element={<List />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
