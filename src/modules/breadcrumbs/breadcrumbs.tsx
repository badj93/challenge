import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, Link } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = observer(() => {
  const location = useLocation();
  const pathNames = location.pathname.split('/');
  const collection = useMemo(() => Object.create(null), []);

  useEffect(() => {
    collection[location.pathname] = location.search;
  }, [location]);

  const getPath = (index: number): string => {
    return pathNames.reduce((acc, curr, i) => {
      if (i <= index) {
        acc += '/' + curr;
      }
      return acc;
    }, '');
  };

  const renderBreadcrumbs = () => {
    return pathNames.map((path, index) => {
      if (path) {
        const pathname = getPath(index);
        const params = collection[pathname.slice(1)];
        return (
          <Link key={path} className={styles.breadcrumb} to={`${pathname}${params ? params : ''}`}>
            {index === 1 ? '' : ' / '}
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </Link>
        );
      }
    });
  };

  return <div className={styles.wrap}>{renderBreadcrumbs()}</div>;
});
