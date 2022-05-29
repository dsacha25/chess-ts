import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Credentials } from '../../../utils/types/credentials/credentials';
import FormInput from '../../common/inputs/form-input/form-input.component';
import {
	BackdropContainer,
	CloseButton,
	LogInButton,
	LoginModuleContainer,
	LoginTitle,
} from './login-module.styles';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { createPortal } from 'react-dom';
import { LogInModuleProps } from './types';
import { IoClose } from 'react-icons/io5';

const LoginModule: FC<LogInModuleProps> = (props) => {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<Credentials>();

	const { deleteUserAccount } = useActions();

	const onSubmit: SubmitHandler<Credentials> = (data) => {
		deleteUserAccount(data);

		props.callback();
	};

	return createPortal(
		<BackdropContainer>
			<LoginModuleContainer onSubmit={handleSubmit(onSubmit)}>
				<LoginTitle color="secondary" margin="0">
					Reauthenticate
					<CloseButton color="light" type="button" onClick={props.callback}>
						<IoClose size="30px" />
					</CloseButton>
				</LoginTitle>
				<FormInput
					{...register('email', { required: true })}
					label="Email"
					hasData={!!watch('email')}
					error={errors.email}
				/>
				<FormInput
					{...register('password', { required: true })}
					label="Password"
					type="password"
					hasData={!!watch('password')}
					error={errors.password}
				/>
				<p>Good ridence. You sucked anyways. Bitch.</p>

				<LogInButton color="warn">Confirm</LogInButton>
			</LoginModuleContainer>
		</BackdropContainer>,
		document.getElementById('reauth') as HTMLElement
	);
};

export default LoginModule;
