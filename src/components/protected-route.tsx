import { FC, ReactNode } from "react";
import { useSelector } from "..";
import { Navigate, useLocation } from "react-router-dom";

interface IProtected {
  onlyUnAuth: boolean,
  component: ReactNode
}

const Protected: FC<IProtected> = (onlyUnAuth, component) => {
  const {isAuthChecked, user} = useSelector((store) => store.user);
  const location = useLocation();
  
  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth: FC<{component: ReactNode}> = (component) => (
  <Protected onlyUnAuth={false} component={component} />
);
export const OnlyUnAuth: FC<{component: ReactNode}> = (component) => (
  <Protected onlyUnAuth={true} component={component} />
);
