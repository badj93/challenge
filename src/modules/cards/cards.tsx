import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Card, cardsStore, filtersStore } from '../../stores';

export const Cards = observer(() => {
  const navigate = useNavigate();
  const filter = filtersStore.getFilters();

  const filterHandler = (filter: Filter) => {
    // filtersStore.setFilters(filter);
  };

  const columns: Record<string, Column> = useMemo(
    () => ({
      cardID: {
        name: 'Card ID',
        field: 'cardID',
        filtered: true,
        filterType: FilterType.Text,
        filterElement: <TextFilter name='Card ID' field='cardID' filterHandler={filterHandler} />,
      },
      cardAccount: {
        name: 'Card account',
        field: 'cardAccount',
        filtered: true,
        filterType: FilterType.Text,
        filterElement: (
          <TextFilter name='Card account' field='cardAccount' filterHandler={filterHandler} />
        ),
      },
      maskedCardNumber: { name: 'Masked card number', field: 'maskedCardNumber', filtered: false },
      expireDate: { name: 'Expire date', field: 'expireDate', filtered: false },
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
      status: { name: 'Status', field: 'status', filtered: false },
      balance: {
        name: 'Balance',
        field: 'balance',
        filtered: true,
        filterType: FilterType.Range,
        filterElement: <RangeFilter field={'amount'} filterHandler={filterHandler} />,
      },
    }),
    [],
  );

  const rowClickHandler = (row: Card) => {
    navigate({ pathname: `${row.cardID}` });
  };

  return (
    <Table
      columns={columns}
      values={cardsStore.getCards()}
      pagination
      countItemPage={10}
      rowClickCallback={rowClickHandler}
      filterChangeCallback={filterHandler}
      filters={filter}
    />
  );
});
