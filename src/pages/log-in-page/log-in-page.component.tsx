import React from 'react';
import FormInput from '../../components/common/inputs/form-input/form-input.component';
import { LogInButton, LogInContainer, LoginTitle } from './log-in-page.styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Credentials } from '../../utils/types/credentials/credentials';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { useNavigate } from 'react-router-dom';
import Paths from '../../utils/types/paths/paths';

const LogInPage = () => {
	const navigate = useNavigate();
	const { logInStart } = useActions();
	const { register, handleSubmit } = useForm<Credentials>();

	const onSubmit: SubmitHandler<Credentials> = (data) => {
		logInStart(data, () => navigate(`/${Paths.DASHBOARD}`));
	};

	return (
		<LogInContainer onSubmit={handleSubmit(onSubmit)}>
			<LoginTitle color="secondary" margin="0">
				Log In
			</LoginTitle>
			<FormInput {...register('email', { required: true })} label="Email" />
			<FormInput
				{...register('password', { required: true })}
				label="Password"
			/>
			<LogInButton color="main">Log In</LogInButton>
		</LogInContainer>
	);
};

export default LogInPage;
