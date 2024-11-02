import React, { useState, useEffect } from "react"
import axios from "axios"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import CheckList from "./CheckList"

const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN

const ListCard = ({ listId }) => {
  const [cardsList, setCardsList] = useState([])
  const [showDialogue, setShowDialogue] = useState(false)
  const [cardName, setCardName] = useState("")
  const [selectedCard, setSelectedCard] = useState(null)
  const [isCardOpen, setIsCardOpen] = useState(false)

  useEffect(() => {
    if (!listId) return

    const getListCards = async () => {
      let url = `https://api.trello.com/1/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`

      try {
        let res = await axios.get(url)
        setCardsList(res.data)
      } catch (error) {
        throw new Error("Error while displaying cards", error)
      }
    }
    getListCards()
  }, [listId])

  // Delete card
  function handleDeleteCard(cardId) {
    let url = `https://api.trello.com/1/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`

    try {
      let res = axios.delete(url)
      setCardsList(cardsList.filter((card) => cardId !== card.id))
    } catch (error) {
      throw new Error("Error while deleting a card", error)
    }
  }

  // Add card
  const handleAddCard = async () => {
    if (!cardName) return

    let url = `https://api.trello.com/1/cards?idList=${listId}&key=${API_KEY}&token=${TOKEN}`
    try {
      let res = await axios.post(url, { name: cardName })
      setCardsList([...cardsList, res.data])
      setCardName("")
      setShowDialogue(false)
    } catch (error) {
      console.log("Error while adding a card")
    }
  }

  const handleCloseAddCard = () => {
    setShowDialogue(false)
  }

  const handleOpenCard = (card) => {
    setSelectedCard(card)
    setIsCardOpen(true)
  }

  const handleCloseCard = () => {
    setIsCardOpen(false)
  }

  return (
    <>
      {cardsList.map((card) => (
        <div key={card.id} style={{ marginBottom: "16px", width: "100%" }}>
          <Card
            onClick={() => handleOpenCard(card)}
            sx={{
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
              style={{ fontWeight: 500, fontSize: "1.1rem", color: "#333" }}
            >
              {card.name}
            </span>
            <Button
              onClick={(e) => {
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

          {/* Card Dialogue */}
          <Dialog
            open={isCardOpen && selectedCard?.id === card.id}
            onClose={handleCloseCard}
          >
            <DialogTitle>Checklist for {card.name}</DialogTitle>
            <DialogContent>
              <CheckList card={card} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCard}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      ))}

      <Button
        variant="outlined"
        onClick={() => setShowDialogue(true)}
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

      <Dialog open={showDialogue} onClose={handleCloseAddCard}>
        <DialogTitle>Add a Card</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="board"
            label="Card Name"
            fullWidth
            variant="standard"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddCard}>Cancel</Button>
          <Button onClick={handleAddCard} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ListCard
