import React from 'react';
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

const CreateAccountPage = () => {
	const { createAccountStart } = useActions();
	const {
		register,
		setValue,
		watch,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm<NewCredentials>();

	const onSubmit: SubmitHandler<NewCredentials> = (data) => {
		//
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
			<SubmitButton color="main">Create Account</SubmitButton>
		</CreateAccountContainer>
	);
};

export default CreateAccountPage;
