import { useState } from 'react';
import { Filter, FilterType, RangeValue } from '../../types';
import styles from './range-filter.module.scss';

export interface RangeFilter {
  field: string;
  filterHandler: (filter: Filter) => void;
}

export const RangeFilter = ({ field, filterHandler }: RangeFilter) => {
  const [value, setValue] = useState<RangeValue>(Object.create(null));

  const submitHandler = () => {
    if (value.min && value.max && value.min < value.max) {
      filterHandler({ field, value: `${value.min},${value.max}`, type: FilterType.Range });
    }
  };

  const changeMinHandler = (e: any) => {
    setValue({ min: e.target.value, max: value.max });
  };

  const changeMaxHandler = (e: any) => {
    setValue({ min: value.min, max: e.target.value });
  };

  return (
    <div className={styles.wrap}>
      <input placeholder='min' type='number' name='min' onChange={changeMinHandler} />
      <input placeholder='max' type='number' name='max' onChange={changeMaxHandler} />
      <button onClick={submitHandler}>submit</button>
    </div>
  );
};
