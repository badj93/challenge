import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Field, Paper } from '../../common';
import { Card as CardI, cardsStore } from '../../stores';
import styles from './card.module.scss';

export const Card = () => {
  const { cardID } = useParams();

  const fields: Field<CardI>[] = useMemo(
    () => [
      { name: 'Card ID', field: 'cardID' },
      { name: 'Card account', field: 'cardAccount' },
      { name: 'Masked card number', field: 'maskedCardNumber' },
      { name: 'ExpireDate', field: 'expireDate' },
      { name: 'Currency', field: 'currency' },
      { name: 'Status', field: 'status' },
      { name: 'Balance', field: 'balance' },
    ],
    [],
  );
  const card = cardsStore.getCardById(cardID);

  return (
    <div className={styles.wrap}>
      <Paper name={`Card ${card.cardID} Details`} entity={card} fields={fields} />
      <Link to={`/cards/${card.cardID}/transactions`}>See all transactions</Link>
    </div>
  );
};
