import { useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  CalendarFilter,
  CheckboxFilter,
  Column,
  Filter,
  FilterType,
  RangeFilter,
  Table,
  TextFilter,
} from '../../common';
import { filtersStore, Transaction, transactionsStore } from '../../stores';

export const Transactions = observer(() => {
  const navigate = useNavigate();
  const { cardID } = useParams();
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (cardID) {
      filtersStore.setFilters(new URLSearchParams({ ['cardID']: cardID }));
    }
  }, [cardID]);

  const filterHandler = (filter: Filter) => {
    if (filter.value) {
      filtersStore.setFilters(new URLSearchParams({ [filter.field]: filter.value }));
    } else {
      filtersStore.clearFilter(filter.field);
    }

    setSearchParams(filtersStore.getFilters(), { replace: true });
  };

  const columns: Record<string, Column> = useMemo(
    () => ({
      transactionID: { name: 'Transaction ID', field: 'transactionID', filtered: false },
      cardAccount: {
        name: 'Card Account',
        field: 'cardAccount',
        filtered: true,
        filterType: FilterType.Text,
        filterElement: (
          <TextFilter name={'Card Account'} field={'cardAccount'} filterHandler={filterHandler} />
        ),
      },
      cardID: {
        name: 'Card ID',
        field: 'cardID',
        filtered: true,
        filterType: FilterType.Text,
        filterElement: (
          <TextFilter name={'Card ID'} field={'cardID'} filterHandler={filterHandler} />
        ),
      },
      amount: {
        name: 'Amount',
        field: 'amount',
        filtered: true,
        filterType: FilterType.Range,
        filterElement: <RangeFilter field={'amount'} filterHandler={filterHandler} />,
      },
      currency: {
        name: 'Currency',
        field: 'currency',
        filtered: true,
        filterType: FilterType.CheckBox,
        filterElement: (
          <CheckboxFilter
            field={'currency'}
            filterHandler={filterHandler}
            values={['EUR', 'USD', 'AZN']}
          />
        ),
      },
      transactionDate: {
        name: 'Transaction Date',
        field: 'transactionDate',
        filtered: true,
        filterType: FilterType.Calendar,
        filterElement: <CalendarFilter field={'transactionDate'} filterHandler={filterHandler} />,
      },
      merchantInfo: { name: 'Merchant Info', field: 'merchantInfo', filtered: false },
    }),
    [],
  );

  const rowClickHandler = (row: Transaction) => {
    navigate({ pathname: `${row.transactionID}` });
  };

  return (
    <Table
      columns={columns}
      values={transactionsStore.getTransactions()}
      pagination
      countItemPage={10}
      rowClickCallback={rowClickHandler}
      filters={filtersStore.getFilters()}
    />
  );
});
