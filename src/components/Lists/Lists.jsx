import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import List from "./List"
import CreateList from "./CreateList"
import { useDispatch, useSelector } from "react-redux"
import { deleteList, fetchLists } from "../../Features/List/listSlice"
import Spinner from "../Spinner"

const Lists = () => {
  const dispatch = useDispatch()
  const { lists, status } = useSelector((state) => state.lists)

  const { boardID } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchLists(boardID))
  }, [boardID, dispatch])

  const handleDeleteList = (listId) => {
    dispatch(deleteList(listId))
  }

  if (status === "loading") return <Spinner />
  if (status === "failed") {
    navigate("/error")
    return
  }
  return (
    <div
      style={{
        minHeight: "83vh",
        overflowX: "auto",
        display: "flex",
        gap: "16px",
        padding: "0 16px",
        marginTop: "50px",
      }}
    >
      {lists.map((list) => (
        <List
          key={list.id}
          list={list}
          id={list.id}
          deleteList={handleDeleteList}
        />
      ))}
      <CreateList />
    </div>
  )
}

export default Lists
