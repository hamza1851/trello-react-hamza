import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const List = () => {
  const [allLists, setAllLists] = useState([])
  const { boardID } = useParams()

  useEffect(() => {
    const getLists = async () => {
      try {
        const response = await axios.get(
          `https://api.trello.com/1/boards/${boardID}/lists?key=${
            import.meta.env.VITE_API_KEY
          }&token=${import.meta.env.VITE_API_TOKEN}`
        )
        console.log("Hey there")
        console.log("Fetched Lists Data:", response.data) // Logs the data received from the API

        setAllLists(response.data)
      } catch (error) {
        console.error("Error fetching lists:", error)
      }
    }
    getLists()
  }, [boardID])

  return (
    <div>
      {allLists.map((list) => (
        <p key={list.id}>{list.name}</p>
      ))}
    </div>
  )
}

export default List
