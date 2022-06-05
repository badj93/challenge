import { useMemo } from 'react';
import { Filter, FilterType } from '../../types';
import styles from './checkbox-filter.module.scss';

interface CheckboxFilterProps {
  field: string;
  filterHandler: (filter: Filter) => void;
  values: string[];
}

export const CheckboxFilter = ({ field, filterHandler, values }: CheckboxFilterProps) => {
  const checkboxValues = Object.create(null);

  const changeHandler = (value: string) => () => {
    let values = '';
    if (!checkboxValues[value]) {
      checkboxValues[value] = value;
    } else {
      delete checkboxValues[value];
    }

    for (const value in checkboxValues) {
      values += value + ' ';
    }

    filterHandler({ field, value: values.trim().replace(/ /g, ','), type: FilterType.CheckBox });
  };

  const renderCheckboxes = useMemo(() => {
    return values.map((value) => (
      <div className={styles.checkbox} key={value}>
        <input type='checkbox' name={value} onChange={changeHandler(value)} />
        <label>{value}</label>
      </div>
    ));
  }, [values]);

  return <div className={styles.wrap}>{renderCheckboxes}</div>;
};
