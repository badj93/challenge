import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import { filtersStore } from '../../stores';
import styles from './filters.module.scss';

export const Filters = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = [...searchParams];
  const filterParams = useMemo(() => filtersStore.getFilters(), []);

  const clearFilter = (filter: string) => () => {
    if (filterParams[filter]) {
      filtersStore.clearFilter(filter);
      delete filterParams[filter];
      setSearchParams(filterParams, { replace: true });
    }
  };

  return filters.length > 0 ? (
    <div className={styles.wrap}>
      Filters
      {filters.map((filter) => (
        <span className={styles.filter} key={filter[0]}>
          {filter[0]}
          <i className={styles.filterClear} onClick={clearFilter(filter[0])}>
            &#10005;
          </i>
        </span>
      ))}
    </div>
  ) : null;
});
