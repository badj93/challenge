import { useLocation, Link } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import { useMemo } from 'react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/');

  const getPath = (index: number): string => {
    return pathNames.reduce((acc, curr, i) => {
      if (i <= index) {
        acc += '/' + curr;
      }
      return acc;
    }, '');
  };

  const renderBreadcrumbs = useMemo(() => {
    return pathNames.map((path, index) => {
      if (path) {
        return (
          <Link key={path} className={styles.breadcrumb} to={getPath(index)}>
            {index === 1 ? '' : ' / '}
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </Link>
        );
      }
    });
  }, [pathNames]);

  return <div className={styles.wrap}>{renderBreadcrumbs}</div>;
};
