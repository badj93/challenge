import { useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Filter as FilterI, FilterType } from '../../../common';
import { Filter } from './components';
import styles from './table.module.scss';

export interface Column {
  name: string;
  field: string;
  filtered?: boolean;
  filterElement?: JSX.Element;
  filterType?: FilterType;
}

export interface TableProps {
  columns: Record<string, Column>;
  values: any[];
  pagination?: boolean;
  countItemPage?: number;
  rowClickCallback?: (row: any) => void;
  filters?: Record<string, string>;
  filterChangeCallback?: (filter: FilterI) => void;
}

export const Table = ({
  columns,
  values,
  pagination,
  countItemPage = values.length,
  rowClickCallback,
  filters,
}: TableProps) => {
  const [page, setPage] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const prevHandler = () => {
    setPage(page - 1);
  };

  const nextHandler = () => {
    setPage(page + 1);
  };

  const filtration = useCallback(
    (values: any[]) => {
      let filteredValues = [...values];

      for (const key in filters) {
        const column = columns[key];

        if (column.filterType === FilterType.Text) {
          filteredValues = filteredValues.filter((value) =>
            value[column.field].includes(filters[key]),
          );
        }

        if (column.filterType === FilterType.Range) {
          const rangeValues = filters[key].split(',');
          filteredValues = filteredValues.filter(
            (value) =>
              value[column.field] >= Number(rangeValues[0]) &&
              value[column.field] <= Number(rangeValues[1]),
          );
        }

        if (column.filterType === FilterType.CheckBox) {
          filteredValues = filteredValues.filter((value) =>
            filters[key].includes(value[column.field]),
          );
        }

        if (column.filterType === FilterType.Calendar) {
          const rangeDates = filters[key].split(',');
          filteredValues = filteredValues.filter(
            (value) =>
              new Date(value[column.field]) >= new Date(rangeDates[0]) &&
              new Date(value[column.field]) <= new Date(rangeDates[1]),
          );
        }
      }

      return filters && Object.values(filters).length ? filteredValues : values;
    },
    [filters],
  );

  const rowClickHandler = (value: any) => () => {
    if (rowClickCallback) {
      rowClickCallback(value);
    }
  };

  const renderValues = useMemo(() => {
    const filteredValues = filtration(values);
    const newValues: any[] = [
      ...filteredValues.slice(page * countItemPage, page * countItemPage + countItemPage),
    ];
    setCanPrev(page * countItemPage >= 10);
    setCanNext(page * countItemPage + countItemPage < filteredValues.length);

    return newValues.map((value) => (
      <tr key={uuidv4()} onClick={rowClickHandler(value)}>
        {Object.values(columns).map((column) => (
          <td align='center' key={uuidv4()}>
            {value[column.field]}
          </td>
        ))}
      </tr>
    ));
  }, [values, countItemPage, page]);

  const renderColumns = useMemo(() => {
    return Object.values(columns).map(({ field, name, filtered, filterElement }) => (
      <th key={field}>
        {name}
        {filtered && <Filter component={filterElement} />}
      </th>
    ));
  }, [columns]);

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>{renderColumns}</tr>
        </thead>
        <tbody>{renderValues}</tbody>
      </table>
      {pagination && countItemPage !== values.length && (
        <div className={styles.pagination}>
          <button disabled={!canPrev} onClick={prevHandler}>
            prev
          </button>
          <button disabled={!canNext} onClick={nextHandler}>
            next
          </button>
        </div>
      )}
    </>
  );
};
