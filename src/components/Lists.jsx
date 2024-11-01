import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import List from "./List"
import CreateList from "./CreateList"

const api_key = import.meta.env.VITE_API_KEY
const token = import.meta.env.VITE_API_TOKEN

const Lists = () => {
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
        setAllLists(response.data)
      } catch (error) {
        console.error("Error fetching lists:", error)
      }
    }
    getLists()
  }, [boardID])

  const deleteList = async (listId) => {
    const deleteUrl = `https://api.trello.com/1/lists/${listId}/closed?key=${api_key}&token=${token}`

    try {
      await axios.put(deleteUrl, { value: true })
      setAllLists(allLists.filter((list) => list.id !== listId))
    } catch (error) {
      throw new Error("Error while deleting a list", error)
    }
  }

  const handleCreateList = (newList) => {
    setAllLists((prev) => [newList, ...prev])
  }

  return (
    <div
      style={{
        overflowX: "auto",
        display: "flex",
        gap: "16px",
        padding: "0 16px",
        marginTop: "50px",
      }}
    >
      {allLists.map((list) => (
        <List key={list.id} list={list} id={list.id} deleteList={deleteList} />
      ))}
      <CreateList onCreateList={handleCreateList} />
    </div>
  )
}

export default Lists
