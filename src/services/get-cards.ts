import { CardStatus, Currency } from '../common/types';

const fakeNumber = Math.floor(1 + Math.random() * (1000000 + 1 - 1));

const generateCards = () => {
  const cards = [];

  for (let i = 0; i < 29; i++) {
    cards.push({
      cardID: `card-id-${i}`,
      cardAccount: `card-account-${i}`,
      maskedCardNumber: fakeNumber,
      expireDate: `${i}-10-2022`,
      currency: Currency.EUR,
      status: CardStatus.Active,
      balance: String(fakeNumber),
    });
  }

  return cards;
};

export const cards = generateCards();
