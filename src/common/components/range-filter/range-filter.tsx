import { useState, ChangeEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, FilterType, RangeValue } from '../../types';
import styles from './range-filter.module.scss';

export interface RangeFilter {
  field: string;
  filterHandler: (filter: Filter) => void;
}

export const RangeFilter = ({ field, filterHandler }: RangeFilter) => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState<RangeValue>({
    min: searchParams.get(field)?.split(',')[0] || '',
    max: searchParams.get(field)?.split(',')[1] || '',
  });

  useEffect(() => {
    if (!searchParams.get(field)) {
      setValue({ min: '', max: '' });
    }
  }, [searchParams]);

  const submitHandler = () => {
    if (value.min && value.max && value.min < value.max) {
      filterHandler({ field, value: `${value.min},${value.max}`, type: FilterType.Range });
    }
  };

  const changeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ min: e.target.value, max: value.max });
  };

  const changeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ min: value.min, max: e.target.value });
  };

  return (
    <div className={styles.wrap}>
      <input
        value={value.min}
        placeholder='min'
        type='number'
        name='min'
        onChange={changeMinHandler}
      />
      <input
        value={value.max}
        placeholder='max'
        type='number'
        name='max'
        onChange={changeMaxHandler}
      />
      <button onClick={submitHandler}>submit</button>
    </div>
  );
};
