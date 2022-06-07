import { ChangeEvent, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from '../../types';

interface TextFilterProps {
  name: string;
  field: string;
  filterHandler: (filter: Filter) => void;
}

export const TextFilter = ({ name, field, filterHandler }: TextFilterProps) => {
  const [searchParams] = useSearchParams();

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    filterHandler({ field, value: e.target.value });
  }, []);

  return <input value={searchParams.get(field) || ''} placeholder={name} type='text' onChange={changeHandler} />;
};
