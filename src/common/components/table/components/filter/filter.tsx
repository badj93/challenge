import { useState } from 'react';
import styles from './filter.module.scss';

export interface FilterProps {
  component?: JSX.Element;
}

export const Filter = ({ component }: FilterProps) => {
  const [show, setShow] = useState(false);

  const clickHandler = () => {
    setShow(!show);
  };

  return (
    <>
      {show ? <i onClick={clickHandler}>&#9650;</i> : <i onClick={clickHandler}>&#9660;</i>}
      <div className={`${styles.filter} ${show ? styles.filterActive : ''}`}>{component}</div>
    </>
  );
};
