import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import Preloader from "../preloader/preloader";



function ProtectedRoute ( { onlyNotAuth = false, component } ) {
  const { isAuthChecked, user } = useSelector(store => store.auth);
  const location = useLocation();

  if ( !isAuthChecked ) {
    return <Preloader/>
  }

  if ( !onlyNotAuth && !user ) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if ( onlyNotAuth && user ) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  return component;
}

export const OnlyAuth = ProtectedRoute;
export const OnlyNotAuth = ({ component }) => (
  <ProtectedRoute onlyNotAuth={true} component={component} />
);

ProtectedRoute.propTypes = {
  onlyNotAuth: PropTypes.bool,
  component: PropTypes.node,
};

export default ProtectedRoute;