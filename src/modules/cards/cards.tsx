import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  CardStatus,
  CheckboxFilter,
  Column,
  Filter,
  FilterType,
  Table,
  TextFilter,
} from '../../common';
import { Card, cardsStore, filtersStore } from '../../stores';

export const Cards = observer(() => {
  const navigate = useNavigate();
  const filter = filtersStore.getFilters();
  const filterParams = useMemo(() => filtersStore.getFilters(), []);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
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
      status: {
        name: 'Status',
        field: 'status',
        filtered: true,
        filterType: FilterType.CheckBox,
        filterElement: (
          <CheckboxFilter
            field={'status'}
            filterHandler={filterHandler}
            values={[CardStatus.Blocked, CardStatus.Active]}
          />
        ),
      },
      balance: {
        name: 'Balance',
        field: 'balance',
        filtered: false,
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
