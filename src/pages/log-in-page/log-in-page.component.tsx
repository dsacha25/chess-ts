import React from 'react';
import FormInput from '../../components/common/inputs/form-input/form-input.component';
import { LogInButton, LogInContainer, LoginTitle } from './log-in-page.styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Credentials } from '../../utils/types/credentials/credentials';

const LogInPage = () => {
	const { register, handleSubmit } = useForm<Credentials>();

	const onSubmit: SubmitHandler<Credentials> = (data) => {
		//
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
