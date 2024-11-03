import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import List from "./List"
import CreateList from "./CreateList"
import { fetchLists, deleteList } from "../../Api-Calls/listsCRUD"

const Lists = () => {
  const [allLists, setAllLists] = useState([])
  const { boardID } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const getLists = async () => {
      const listsData = await fetchLists(boardID, navigate)
      setAllLists(listsData)
    }
    getLists()
  }, [boardID])

  const handleDeleteList = async (listId) => {
    await deleteList(listId, navigate)
    setAllLists(allLists.filter((list) => list.id !== listId))
  }

  const handleCreateList = (newList) => {
    setAllLists((prev) => [newList, ...prev])
  }

  return (
    <div
      style={{
        minHeight:"83vh",
        overflowX: "auto",
        display: "flex",
        gap: "16px",
        padding: "0 16px",
        marginTop: "50px",
      }}
    >
      {allLists.map((list) => (
        <List
          key={list.id}
          list={list}
          id={list.id}
          deleteList={handleDeleteList}
        />
      ))}
      <CreateList onCreateList={handleCreateList} />
    </div>
  )
}

export default Lists
