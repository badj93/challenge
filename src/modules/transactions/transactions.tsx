import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  CheckboxFilter,
  Column,
  Filter,
  FilterType,
  RangeFilter,
  Table,
  TextFilter,
} from '../../common';
import { Transaction, transactionsStore, filtersStore } from '../../stores';

export const Transactions = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardID } = useParams();
  const filterParams = useMemo(() => filtersStore.getFilters(), []);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (cardID) {
      setSearchParams({ cardID: cardID });
    }

    filtersStore.setFilters(searchParams);
  }, [searchParams]);

  const filterHandler = (filter: Filter) => {
    if (filter.value) {
      filterParams[filter.field] = filter.value;
    } else {
      delete filterParams[filter.field];
    }

    setSearchParams(filterParams, { replace: true });
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
      transactionDate: { name: 'Transaction Date', field: 'transactionDate', filtered: true },
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
