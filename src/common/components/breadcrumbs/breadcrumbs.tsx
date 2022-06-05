import { useMemo} from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/');
  const searchParams: Record<string, string> = useMemo(() => Object.create(null), []);

  const getPath = (index: number): string => {
    return pathNames.reduce((acc, curr, i) => {
      if (curr && location.search) {
        searchParams[curr] = location.search;
      }

      if (i <= index) {
        acc += '/' + curr;
      }
      return acc;
    }, '');
  };

  const renderBreadcrumbs = () => {
    return pathNames.map((path, index) => {
      if (path) {
        return (
          <Link
            key={path}
            className={styles.breadcrumb}
            to={`${getPath(index)}${searchParams[path] ? searchParams[path] : ''}`}
          >
            {index === 1 ? '' : ' / '}
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </Link>
        );
      }
    });
  };

  return <div className={styles.wrap}>{renderBreadcrumbs()}</div>;
};
