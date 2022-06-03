import { Filter, FilterType } from '../../types';

interface TextFilterProps {
  name: string;
  field: string;
  filterHandler: (filter: Filter) => void;
}

export const TextFilter = ({ name, field, filterHandler }: TextFilterProps) => {
  const changeHandler = (e: any) => {
    filterHandler({ field, value: e.target.value, type: FilterType.Text });
  };

  return <input placeholder={name} type='text' onChange={changeHandler} />;
};
