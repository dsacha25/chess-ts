import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import FormInput from '../../common/inputs/form-input/form-input.component';
import { LoginModuleContainer } from './login-module.styles';
import { LoginModuleProps } from './types';

const LoginModule: FC<LoginModuleProps> = (props) => {
	const navigate = useNavigate();
	const { logInStart } = useActions();

	useForm();

	return (
		<LoginModuleContainer>
			<FormInput />
		</LoginModuleContainer>
	);
};

export default LoginModule;
