import React, { useEffect, useState } from 'react';
import {
	CreateAccountContainer,
	CreateAccountTitle,
	ErrorText,
	NewCredentialsContainer,
	SubmitButton,
} from './create-account-page.styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NewCredentials } from '../../utils/types/users/new-credentials/new-credentials';
import FormInput from '../../components/common/inputs/form-input/form-input.component';
import PhotoUploader from '../../components/common/inputs/photo-uploader/photo-uploader.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import Spinner from '../../components/common/spinner/spinner.component';
import { useNavigate } from 'react-router-dom';
import Paths from '../../utils/types/util/paths/paths';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectAuthError } from '../../redux/user/user.selector';

const CreateAccountPage = () => {
	const navigate = useNavigate();
	const authError = useSelector((state) => selectAuthError(state));
	const { createAccountStart, clearUserError } = useActions();
	const [loading, setLoading] = useState(false);
	const {
		register,
		setValue,
		watch,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm<NewCredentials>();

	const createAccountCallback = () => {
		setTimeout(() => {
			navigate(`/${Paths.DASHBOARD}`);
			setLoading(false);
		}, 1000);
	};

	const onSubmit: SubmitHandler<NewCredentials> = (data) => {
		setLoading(true);
		createAccountStart(data, createAccountCallback);
	};

	useEffect(() => {
		clearUserError();

		return () => {
			clearUserError();
		};

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (loading && authError) {
			setLoading(false);
		}

		// eslint-disable-next-line
	}, [authError]);

	return (
		<CreateAccountContainer onSubmit={handleSubmit(onSubmit)}>
			<CreateAccountTitle margin="0" color="main">
				Create Account
			</CreateAccountTitle>
			<NewCredentialsContainer>
				<FormInput
					{...register('displayName', { required: true })}
					label="Display Name"
					hasData={!!watch('displayName')}
					error={errors.displayName}
					autoFocus
				/>
				<FormInput
					{...register('email', { required: true })}
					label="Email"
					type="email"
					hasData={!!watch('email')}
					error={errors.email}
				/>
				<FormInput
					{...register('password', { required: true })}
					label="Password"
					type="password"
					hasData={!!watch('password')}
					error={errors.password || authError}
					autoComplete="new-password"
					className="password"
				/>
				<FormInput
					{...register('confirmPassword', {
						required: true,
						validate: {
							passwordsMatch: (value) =>
								value === getValues('password') || 'Passwords must match.',
						},
					})}
					label="Confirm Password"
					type="password"
					hasData={!!watch('confirmPassword')}
					error={errors.confirmPassword}
					autoComplete="new-password"
					className="password"
				/>

				{authError && <ErrorText>{authError}</ErrorText>}
			</NewCredentialsContainer>

			<PhotoUploader
				setValue={setValue}
				name="photoURL"
				label="Profile Picture"
			/>
			<SubmitButton color="main">
				{loading ? (
					<Spinner width="40px" height="40px" size="40px" />
				) : (
					'Create Account'
				)}
			</SubmitButton>
		</CreateAccountContainer>
	);
};

export default CreateAccountPage;
