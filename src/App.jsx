import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./Layouts/MainLayout"
import Boards from "./components/Board/Boards"
import Lists from "./components/Lists/Lists"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Boards />} />
          <Route path="/:boardID" element={<Lists />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
