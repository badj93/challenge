import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../types';
import styles from './navigation.module.scss';

interface NavigationProps {
  routes: Routes[];
}

export const Navigation = ({ routes }: NavigationProps) => {
  const renderRoutes = useMemo(() => {
    return routes.map((route) => (
      <Link className={styles.link} key={route.name} to={route.to}>
        {route.name}
      </Link>
    ));
  }, []);

  return <div className={styles.wrap}>{renderRoutes}</div>;
};
