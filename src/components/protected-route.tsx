import { FC, ReactNode } from "react";
import { useSelector } from "../utils/types";
import { Navigate, useLocation } from "react-router-dom";

interface IProtected {
  onlyUnAuth: boolean,
  component: JSX.Element
}

interface IComponent{
  component: JSX.Element
}


const Protected = ({onlyUnAuth, component}: IProtected): JSX.Element | null  => {
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

export const OnlyAuth = ({component}: IComponent): JSX.Element | null => (
  <Protected onlyUnAuth={false} component={component} />
);
export const OnlyUnAuth= ({component}: IComponent): JSX.Element | null => (
  <Protected onlyUnAuth={true} component={component} />
);
