import { makeAutoObservable } from 'mobx';
import { CardStatus, Currency } from '../common';
import { cards } from '../services';

export interface Card {
  cardID: string;
  cardAccount: string;
  maskedCardNumber: number;
  expireDate: string;
  currency: Currency;
  status: CardStatus;
  balance: string;
}

interface CardsStore {
  cards: Record<string, Card>;
  setCards: (cards: Card[]) => void;
  getCards: () => Card[];
  getCardById: (cardId?: string) => Card;
}

class Cards implements CardsStore {
  cards: Record<string, Card> = Object.create(null);

  constructor() {
    makeAutoObservable(this);
    this.setCards(cards);
  }

  setCards(cards: Card[]) {
    for (const card of cards) {
      this.cards[card.cardID] = card;
    }
  }

  getCards() {
    return Object.values(this.cards);
  }

  getCardById(cardId?: string) {
    if (cardId) {
      const card = this.cards[cardId];

      if (card) {
        return card;
      }

      throw new Error(`card with id ${cardId} was not found`);
    }

    throw new Error('cardID is required');
  }
}

export const cardsStore = new Cards();
