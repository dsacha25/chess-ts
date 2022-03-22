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

const CreateAccountPage = () => {
	const { register, setValue, handleSubmit } = useForm<NewCredentials>();

	const onSubmit: SubmitHandler<NewCredentials> = (data) => {
		//
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
				/>
				<FormInput {...register('email', { required: true })} label="Email" />
				<ColumnsContainer gridGap="30px">
					<FormInput
						{...register('password', { required: true })}
						label="Password"
					/>
					<FormInput
						{...register('confirmPassword', { required: true })}
						label="Confirm Password"
					/>
				</ColumnsContainer>
			</NewCredentialsContainer>
			<PhotoUploader setValue={setValue} name="photoURL" />
			<SubmitButton color="main">Create Account</SubmitButton>
		</CreateAccountContainer>
	);
};

export default CreateAccountPage;
