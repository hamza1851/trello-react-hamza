import React from "react"
import { Card, Button } from "@mui/material"
import ListCard from "./ListCard"
import DeleteIcon from "@mui/icons-material/Delete"

const List = ({ list, deleteList }) => {
  return (
    <div style={{ flex: "0 0 auto", width: "250px", padding: "8px" }}>
      <Card
        sx={{
          backgroundColor: "#3f5cc8",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "20px",
          transition: "transform 0.2s",
          height: "fit-content",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "200px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#ffffff",
            }}
          >
            {list.name}
          </span>
          <Button
            onClick={() => deleteList(list.id)}
            sx={{
              marginBottom: "20px",
              minWidth: "auto",
              padding: "6px",
              color: "#ffffff",
              "&:hover": {
                color: "#e8f5e9",
              },
            }}
          >
            <DeleteIcon />
          </Button>
        </div>
        <ListCard listId={list.id} />
      </Card>
    </div>
  )
}

export default List
