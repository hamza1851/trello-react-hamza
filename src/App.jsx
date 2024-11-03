import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./Layouts/MainLayout"
import Boards from "./components/Board/Boards"
import Lists from "./components/Lists/Lists"
import NotFound from "./Pages/NotFoundPage"
import ErrorPage from "./Pages/ErrorPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Boards />} />
          <Route path="/:boardID" element={<Lists />} />
          <Route path="/:boardID/*" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/error" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
