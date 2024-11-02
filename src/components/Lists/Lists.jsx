import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import List from "./List"
import CreateList from "./CreateList"
import { fetchLists, deleteList as deleteListApi } from "../../Logic/apiCRUD" // Adjusted import path

const Lists = () => {
  const [allLists, setAllLists] = useState([])
  const { boardID } = useParams()

  useEffect(() => {
    const getLists = async () => {
      const listsData = await fetchLists(boardID)
      setAllLists(listsData)
    }
    getLists()
  }, [boardID])

  const handleDeleteList = async (listId) => {
    await deleteListApi(listId)
    setAllLists(allLists.filter((list) => list.id !== listId))
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
