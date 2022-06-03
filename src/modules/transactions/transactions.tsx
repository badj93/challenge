import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FilterType, Table } from '../../common';
import { Transaction, transactionsStore } from '../../stores';

export const Transactions = observer(() => {
  const navigate = useNavigate();
  const { cardID } = useParams();
  const defaultFilter = cardID
    ? { field: 'cardID', value: cardID, type: FilterType.Text }
    : undefined;
  const rowClickHandler = (row: Transaction) => {
    navigate({ pathname: `${row.transactionID}` });
  };

  return (
    <Table
      columns={[
        { name: 'Transaction ID', field: 'transactionID', filtered: false },
        { name: 'Card Account', field: 'cardAccount', filtered: true },
        { name: 'Card ID', field: 'cardID', filtered: true },
        { name: 'Amount', field: 'amount', filtered: true },
        { name: 'Currency', field: 'currency', filtered: true },
        { name: 'Transaction Date', field: 'transactionDate', filtered: true },
        { name: 'Merchant Info', field: 'merchantInfo', filtered: false },
      ]}
      values={transactionsStore.getTransactions()}
      pagination
      countItemPage={10}
      rowClickCallback={rowClickHandler}
      defaultFilter={defaultFilter}
    />
  );
});
