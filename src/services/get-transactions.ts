const fakeNumber = Math.floor(1 + Math.random() * (1000000 + 1 - 1));

const generateTransactions = () => {
  const transactions = [];

  for (let i = 0; i < 29; i++) {
    transactions.push({
      transactionID: `id-${i}`,
      cardAccount: `card-account-${i}`,
      cardID: `card-id-${i}`,
      amount: String(fakeNumber * i),
      currency: String(fakeNumber * i),
      transactionDate: `${i}-10-2022`,
      merchantInfo: `merchant-${i}`,
    });
  }

  return transactions;
};

export const transactions = generateTransactions();
