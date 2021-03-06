import React, { Fragment } from 'react';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectUserAuth } from '../../redux/user/user.selector';

const withUser =
	(Component: React.FC): React.FC =>
	(props) => {
		const user = useSelector((state) => selectUserAuth(state));

		return user ? <Component {...props}>{props.children}</Component> : null;
	};

const UsersOnly: React.FC = (props) => <Fragment>{props.children}</Fragment>;

export default withUser(UsersOnly);
