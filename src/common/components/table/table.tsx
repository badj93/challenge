import { useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Filter as FilterI, FilterType } from '../../../common';
import { Filter } from './components';
import styles from './table.module.scss';

export interface TableProps {
  columns: {
    name: string;
    field: string;
    filtered?: boolean;
    filterElement?: JSX.Element;
  }[];
  values: any[];
  pagination?: boolean;
  countItemPage?: number;
  rowClickCallback?: (row: any) => void;
  defaultFilter?: FilterI;
  filterChangeCallback?: (filter: FilterI) => void;
}

export const Table = ({
  columns,
  values,
  pagination,
  countItemPage = values.length,
  rowClickCallback,
  defaultFilter,
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
      if (defaultFilter && defaultFilter.type === FilterType.Text && defaultFilter.value) {
        return values.filter((value) => value[defaultFilter.field].includes(defaultFilter.value));
      }
      return values;
    },
    [defaultFilter],
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
    setCanNext(page * countItemPage + countItemPage <= newValues.length);

    return newValues.map((value) => (
      <tr key={uuidv4()} onClick={rowClickHandler(value)}>
        {columns.map((column) => (
          <td align='center' key={uuidv4()}>
            {value[column.field]}
          </td>
        ))}
      </tr>
    ));
  }, [values, countItemPage, page]);

  const renderColumns = useMemo(() => {
    return columns.map(({ field, name, filtered, filterElement }) => (
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
