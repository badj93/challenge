import { useSearchParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import { Filter, FilterType } from '../../types';
import 'react-calendar/dist/Calendar.css';

interface CheckboxFilterProps {
  field: string;
  filterHandler: (filter: Filter) => void;
}

export const CalendarFilter = ({ field, filterHandler }: CheckboxFilterProps) => {
  const [searchParams] = useSearchParams();
  const dates = searchParams
    .get(field)
    ?.split(',')
    .map((param) => new Date(param));

  const changeHandler = (dates: [Date] | [Date, Date]) => {
    const newDates = dates.map((date) => date.toISOString());
    filterHandler({ field, value: newDates.join(','), type: FilterType.Calendar });
  };

  return (
    <div>
      <Calendar defaultValue={dates} selectRange onChange={changeHandler} returnValue='range' />
    </div>
  );
};
