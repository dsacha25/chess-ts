import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectUserAuth } from '../../../redux/user/user.selector';

const PrivateRoute = () => {
	const user = useSelector((state) => selectUserAuth(state));
	return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
