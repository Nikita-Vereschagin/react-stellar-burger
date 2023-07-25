import { useAuth } from '../services/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function ProtectedRouteElement({ element }) {
    let { getUser, ...auth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);
    const location = useLocation()

    const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

    if (!isUserLoaded) {
    return null;
  }
  if (auth.user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  if (!auth.user) {
    const { from } = location.state;
    if (from === '/forgot-password'){
        return <Navigate to="/reset-password" replace/>
    }
    return <Navigate to="/login" replace/>;
  }
  return element
}