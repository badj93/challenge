import { CardStatus, Currency, randomNumber } from '../common';
import { Card } from '../stores';

const currency = [Currency.EUR, Currency.AZN, Currency.USD];
const status = [CardStatus.Active, CardStatus.Blocked];

const generateCards = () => {
  const cards: Card[] = [];

  for (let i = 0; i < 29; i++) {
    const randomDay = randomNumber(0, 30);
    const randomMonth = randomNumber(0, 12);
    const randomDate = `${randomDay < 10 ? `0${randomDay}` : randomDay}-${
      randomMonth < 10 ? `0${randomMonth}` : randomMonth
    }-2022`;

    cards.push({
      cardID: `card-id-${i}`,
      cardAccount: `card-account-${randomNumber(0, 10)}`,
      maskedCardNumber: randomNumber(0, 100000),
      expireDate: randomDate,
      currency: currency[randomNumber(0, 3)],
      status: status[randomNumber(0, 2)],
      balance: String(randomNumber(0, 100000000)),
    });
  }

  return cards;
};

export const cards = generateCards();
