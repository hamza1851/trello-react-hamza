import React, { useState, useEffect } from "react"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import AddCardDialog from "./List-Cards/AddCardDialog"
import CardDialog from "./List-Cards/CardDialog"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  addCard,
  deleteCard,
  fetchCards,
} from "../../Features/List/listCardSlice"
import Spinner from "../Spinner"

const ListCard = ({ listId }) => {
  const dispatch = useDispatch()
  const { listCards, status } = useSelector((state) => state.listCards)
  const cards = listCards[listId] || []
  const [showAddCardDialog, setShowAddCardDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const loadCards = () => {
      if (!listId) return
      dispatch(fetchCards(listId))
    }
    loadCards()
  }, [listId])

  if (status === "loading") return <Spinner />
  if (status === "failed") {
    navigate("/error")
    return
  }

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId)).then(() => dispatch(fetchCards(listId)))
  }

  const handleAddCard = (cardName) => {
    if (!cardName) return

    dispatch(addCard({ listId, cardName })).then(() =>
      dispatch(fetchCards(listId))
    )

    setShowAddCardDialog(false)
  }

  const handleOpenCard = (card) => {
    setSelectedCard(card)
    setIsCardDialogOpen(true)
  }

  const handleCloseCardDialog = () => {
    setIsCardDialogOpen(false)
  }

  return (
    <>
      {cards.map((card) => (
        <div key={card.id} style={{ marginBottom: "16px", width: "100%" }}>
          <Card
            onClick={() => handleOpenCard(card)}
            sx={{
              backgroundColor: "#7a94e2",
              padding: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <span
              style={{ fontWeight: 500, fontSize: "1.1rem", color: "#fff" }}
            >
              {card.name}
            </span>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteCard(card.id)
              }}
              sx={{
                minWidth: "auto",
                padding: "6px",
                color: "#555",
                "&:hover": {
                  color: "#000",
                },
              }}
            >
              <DeleteIcon />
            </Button>
          </Card>
        </div>
      ))}

      <Button
        variant="outlined"
        onClick={() => setShowAddCardDialog(true)}
        sx={{
          marginTop: "60px",
          color: "white",
          borderColor: "white",
          padding: "10px 20px",
          borderRadius: "25px",
          fontWeight: "bold",
          fontSize: "1rem",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#3498db",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(52, 152, 219, 0.4)",
            borderColor: "#3498db",
          },
        }}
      >
        + Add a card
      </Button>

      <AddCardDialog
        open={showAddCardDialog}
        onClose={() => setShowAddCardDialog(false)}
        onAddCard={handleAddCard}
      />

      <CardDialog
        open={isCardDialogOpen}
        onClose={handleCloseCardDialog}
        card={selectedCard}
      />
    </>
  )
}

export default ListCard
