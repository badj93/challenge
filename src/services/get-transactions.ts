import { randomNumber } from '../common';

const currency = ['EUR', 'USD', 'AZN'];

const generateTransactions = () => {
  const transactions = [];

  for (let i = 0; i < 29; i++) {
    const randomDay = randomNumber(1, 30);
    const randomMonth = randomNumber(1, 12);
    const randomDate = `${
      randomMonth < 10 ? `0${randomMonth}` : randomMonth
    }-${randomDay < 10 ? `0${randomDay}` : randomDay}-2022`;

    transactions.push({
      transactionID: `id-${i}`,
      cardAccount: `card-account-${randomNumber(0, 10)}`,
      cardID: `card-id-${randomNumber(0, 10)}`,
      amount: String(randomNumber(i, 100000)),
      currency: currency[randomNumber(0, 3)],
      transactionDate: randomDate,
      merchantInfo: `merchant-${i}`,
    });
  }

  return transactions;
};

export const transactions = generateTransactions();
