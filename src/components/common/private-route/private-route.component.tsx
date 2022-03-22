import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectCurrentUser } from '../../../redux/user/user.selector';

const PrivateRoute = () => {
	const user = useSelector((state) => selectCurrentUser(state));
	return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
