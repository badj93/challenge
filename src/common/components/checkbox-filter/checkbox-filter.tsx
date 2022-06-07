import { useEffect, useMemo, useState, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, FilterType } from '../../types';
import styles from './checkbox-filter.module.scss';

interface CheckboxFilterProps {
  field: string;
  filterHandler: (filter: Filter) => void;
  values: string[];
}

export type Checkbox = Record<string, { value: string; checked: boolean }>;

export const CheckboxFilter = ({ field, filterHandler, values }: CheckboxFilterProps) => {
  const [chValues, setChValues] = useState<Checkbox>(() => Object.create(null));
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (values.length > 0) {
      const chParams = searchParams.get(field) || '';
      const collection: Checkbox = Object.create(null);

      for (const value of values) {
        collection[value] = { value, checked: chParams.includes(value) };
      }

      setChValues(collection);
    }
  }, [values, searchParams]);

  const changeHandler = (checkbox: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const collection: Checkbox = { ...chValues };
    let values = '';
    collection[checkbox].checked = e.target.checked;

    setChValues(collection);

    for (const checkbox of Object.values(collection)) {
      if (checkbox.checked) {
        values += checkbox.value + ' ';
      }
    }

    filterHandler({ field, value: values.trim().replace(/ /g, ','), type: FilterType.CheckBox });
  };

  const renderCheckboxes = useMemo(() => {
    return Object.values(chValues).map((checkbox) => {
      return (
        <div className={styles.checkbox} key={checkbox.value}>
          <input
            checked={checkbox.checked}
            type='checkbox'
            name={checkbox.value}
            onChange={changeHandler(checkbox.value)}
          />
          <label>{checkbox.value}</label>
        </div>
      );
    });
  }, [values, chValues]);

  return <div className={styles.wrap}>{renderCheckboxes}</div>;
};
