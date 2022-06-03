import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Filter, Table, TextFilter } from '../../common';
import { Card, cardsStore } from '../../stores';
import { useMemo } from 'react';

export const Cards = observer(() => {
  const navigate = useNavigate();
  const filter = cardsStore.getFilter();

  const filterHandler = (filter: Filter) => {
    cardsStore.setFilter(filter);
  };

  const columns = useMemo(
    () => [
      {
        name: 'Card ID',
        field: 'cardID',
        filtered: true,
        filterElement: <TextFilter name='Card ID' field='cardID' filterHandler={filterHandler} />,
      },
      {
        name: 'Card account',
        field: 'cardAccount',
        filtered: true,
        filterElement: (
          <TextFilter name='Card account' field='cardAccount' filterHandler={filterHandler} />
        ),
      },
      { name: 'Masked card number', field: 'maskedCardNumber', filtered: false },
      { name: 'Expire date', field: 'expireDate', filtered: false },
      {
        name: 'Currency',
        field: 'currency',
        filtered: true,
      },
      { name: 'Status', field: 'status', filtered: false },
      {
        name: 'Balance',
        field: 'balance',
        filtered: true,
      },
    ],
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
      defaultFilter={filter}
    />
  );
});
