import { Link } from 'react-router-dom';
import styles from './paper.module.scss';
import { useMemo } from 'react';

export interface Field<T> {
  name: string;
  field: keyof T;
  link?: boolean;
  to?: string;
  fieldLink?: string;
}

interface PaperProps {
  entity: any;
  fields: any[];
  name: string;
}

export const Paper = ({ fields, entity, name }: PaperProps) => {
  const renderInfo = useMemo(() => {
    return fields.map(({ name, field, link, to, fieldLink }) => (
      <div key={field} className={styles.section}>
        <strong className={styles.sectionName}>{name}:</strong>
        {link ? (
          <Link to={`${to}/${entity[fieldLink]}`} className={styles.sectionValue}>
            {entity[field]}
          </Link>
        ) : (
          <span className={styles.sectionValue}>{entity[field]}</span>
        )}
      </div>
    ));
  }, [fields, entity]);

  return (
    <>
      <h2 className={styles.paperName}>{name}</h2>
      {renderInfo}
    </>
  );
};
