import React, { useState } from 'react';
import { ColumnsContainer } from '../../components/common/containers/grids/grids.styles';
import {
	CreateAccountContainer,
	CreateAccountTitle,
	NewCredentialsContainer,
	SubmitButton,
} from './create-account-page.styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NewCredentials } from '../../utils/types/new-credentials/new-credentials';
import FormInput from '../../components/common/inputs/form-input/form-input.component';
import PhotoUploader from '../../components/common/inputs/photo-uploader/photo-uploader.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import Spinner from '../../components/common/spinner/spinner.component';
import { useNavigate } from 'react-router-dom';
import Paths from '../../utils/types/paths/paths';

const CreateAccountPage = () => {
	const navigate = useNavigate();
	const { createAccountStart } = useActions();
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
		navigate(`/${Paths.DASHBOARD}`);
		setLoading(false);
	};

	const onSubmit: SubmitHandler<NewCredentials> = (data) => {
		setLoading(true);
		createAccountStart(data, createAccountCallback);
	};

	return (
		<CreateAccountContainer onSubmit={handleSubmit(onSubmit)}>
			<CreateAccountTitle margin="0" color="main">
				Create Account
			</CreateAccountTitle>
			<NewCredentialsContainer rows={3}>
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
				<ColumnsContainer gridGap="30px">
					<FormInput
						{...register('password', { required: true })}
						label="Password"
						type="password"
						hasData={!!watch('password')}
						error={errors.password}
						autoComplete="new-password"
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
					/>
				</ColumnsContainer>
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
