import Calendar from 'react-calendar';
import { Filter, FilterType } from '../../types';
import 'react-calendar/dist/Calendar.css';

interface CheckboxFilterProps {
  field: string;
  filterHandler: (filter: Filter) => void;
}

export const CalendarFilter = ({ field, filterHandler }: CheckboxFilterProps) => {
  const changeHandler = (dates: [Date] | [Date, Date]) => {
    const newDates = dates.map((date) => date.toISOString());
    filterHandler({ field, value: newDates.join(','), type: FilterType.Calendar });
  };

  return (
    <div>
      <Calendar selectRange onChange={changeHandler} returnValue='range' />
    </div>
  );
};
