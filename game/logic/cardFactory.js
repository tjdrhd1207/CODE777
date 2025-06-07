import { CARD_INFO, CARD_COUNTS } from "../model/Card.js";

export function generateDeck() {
  const deck = [];
  CARD_INFO.forEach((card) => {
    const key = `${card.value}_${card.color}`;
    const count = CARD_COUNTS[key] || 0;
    for (let i = 0; i < count; i++) {
      deck.push({ ...card });
    }
  });
  return deck;
}