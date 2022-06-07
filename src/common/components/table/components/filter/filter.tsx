import { useEffect, useRef, useState } from 'react';
import styles from './filter.module.scss';

export interface FilterProps {
  component?: JSX.Element;
}

export const Filter = ({ component }: FilterProps) => {
  const [show, setShow] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLElement>(null);

  const clickHandler = () => {
    setShow(!show);
  };

  const closeHandler = (e: MouseEvent) => {
    if (!componentRef.current?.contains(e.target as Node) && e.target !== iconRef.current) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeHandler);

    return () => document.removeEventListener('click', closeHandler);
  }, []);

  return (
    <>
      {show ? (
        <i ref={iconRef} onClick={clickHandler}>
          &#9650;
        </i>
      ) : (
        <i ref={iconRef} onClick={clickHandler}>
          &#9660;
        </i>
      )}
      <div ref={componentRef} className={`${styles.filter} ${show ? styles.filterActive : ''}`}>
        {component}
      </div>
    </>
  );
};
