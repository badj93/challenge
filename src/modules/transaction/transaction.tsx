import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Transaction as TransactionI, transactionsStore } from '../../stores';
import { Paper, Field } from '../../common';
import styles from './transaction.module.scss';

export const Transaction = observer(() => {
  const { transactionID } = useParams();
  const fields: Field<TransactionI>[] = useMemo(
    () => [
      { name: 'Transaction ID', field: 'transactionID' },
      { name: 'Card account', field: 'cardAccount', link: true, to: '/cards', fieldLink: 'cardID' },
      { name: 'Card ID', field: 'cardID' },
      { name: 'Amount', field: 'amount' },
      { name: 'Currency', field: 'currency' },
      { name: 'Transaction Date', field: 'transactionDate' },
      { name: 'Merchant Info', field: 'merchantInfo' },
    ],
    [],
  );

  return (
    <div className={styles.wrap}>
      <Paper
        name='Transaction Detail'
        entity={transactionsStore.getTransactionById(transactionID)}
        fields={fields}
      />
    </div>
  );
});
