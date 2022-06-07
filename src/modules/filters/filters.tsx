import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { filtersStore } from '../../stores';
import styles from './filters.module.scss';

export const Filters = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterNames: Record<string, string> = useMemo(
    () => ({
      cardID: 'card ID',
      cardAccount: 'card account',
      amount: 'amount',
      currency: 'currency',
      transactionDate: 'transaction date',
      status: 'status',
    }),
    [],
  );

  const clearFilter = (filter: string) => () => {
    filtersStore.clearFilter(filter);
    setSearchParams(filtersStore.getFilters(), { replace: true });
  };

  useEffect(() => {
    filtersStore.setFilters(searchParams);
  }, []);

  const clearAllFilters = () => {
    filtersStore.clearFilters();
    setSearchParams(Object.create(null));
  };

  return Object.keys(filtersStore.getFilters()).length > 0 ? (
    <div className={styles.wrap}>
      Filters
      {Object.keys(filtersStore.getFilters()).map((filter) => (
        <span className={styles.filter} key={filter}>
          {filterNames[filter]}
          <i className={styles.filterClear} onClick={clearFilter(filter)}>
            &#10005;
          </i>
        </span>
      ))}
      <button onClick={clearAllFilters}>Clear all filters</button>
    </div>
  ) : null;
});
