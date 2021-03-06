import React from 'react';
import FormInput from '../../components/common/inputs/form-input/form-input.component';
import { LogInButton, LogInContainer, LoginTitle } from './log-in-page.styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Credentials } from '../../utils/types/users/credentials/credentials';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { useNavigate } from 'react-router-dom';
import Paths from '../../utils/types/util/paths/paths';

const LogInPage = () => {
	const navigate = useNavigate();
	const { logInStart } = useActions();
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<Credentials>();

	const callback = () => {
		setTimeout(() => {
			navigate(`/${Paths.DASHBOARD}`);
		}, 1000);
	};

	const onSubmit: SubmitHandler<Credentials> = (data) => {
		logInStart(data, callback);
	};

	return (
		<LogInContainer onSubmit={handleSubmit(onSubmit)}>
			<LoginTitle color="secondary" margin="0">
				Log In
			</LoginTitle>
			<FormInput
				{...register('email', { required: true })}
				label="Email"
				hasData={!!watch('email')}
				autoFocus
				error={errors.email}
			/>
			<FormInput
				{...register('password', { required: true })}
				label="Password"
				type="password"
				hasData={!!watch('password')}
				error={errors.password}
			/>
			<LogInButton color="main">Log In</LogInButton>
		</LogInContainer>
	);
};

export default LogInPage;
