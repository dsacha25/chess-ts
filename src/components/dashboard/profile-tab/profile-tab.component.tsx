import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectChessUser } from '../../../redux/user/user.selector';
import { UpdateCredentials } from '../../../utils/types/update-credentials/update-credentials';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import FormInput from '../../common/inputs/form-input/form-input.component';
import PhotoUploader from '../../common/inputs/photo-uploader/photo-uploader.component';
import Title from '../../common/title/title.styles';
import {
	DeleteAccountButton,
	ProfileContainer,
	ProfileDataContainer,
	SubmitUpdateButton,
	UpdateProfileForm,
} from './profile-tab.styles';

const ProfileTab = () => {
	const user = useSelector((state) => selectChessUser(state));

	const { deleteUserAccount, updateProfileInfo } = useActions();

	const { register, watch, setValue, handleSubmit } =
		useForm<UpdateCredentials>();

	const onSubmit: SubmitHandler<UpdateCredentials> = (data) => {
		if (user?.email === data.email) {
			data.email = undefined;
		}
		if (user?.displayName === data.displayName) {
			data.displayName = undefined;
		}

		if (user?.photoURL === data.photoURL) {
			data.photoURL = undefined;
		}

		updateProfileInfo(data);
	};

	useEffect(() => {
		if (user && user.displayName) {
			setValue('displayName', user.displayName);
		}

		if (user && user.email) {
			setValue('email', user.email);
		}

		// eslint-disable-next-line
	}, []);

	return (
		<ProfileContainer>
			<Title fontWeight={200}>Profile Page</Title>

			<Title fontSize="20px">Update Profile</Title>

			<UpdateProfileForm onSubmit={handleSubmit(onSubmit)}>
				<ProfileDataContainer>
					<FormInput
						{...register('displayName')}
						label="Display Name"
						hasData={!!watch('displayName')}
					/>
					<FormInput
						{...register('email')}
						label="Email"
						hasData={!!watch('email')}
					/>
				</ProfileDataContainer>
				<PhotoUploader
					defaultPhoto={user?.photoURL || ''}
					setValue={setValue}
					name="photoURL"
					label="Profile Picture"
				/>

				<SubmitUpdateButton color="main">Submit</SubmitUpdateButton>
			</UpdateProfileForm>

			<p>Good ridence. You sucked anyways. Bitch.</p>
			<DeleteAccountButton
				onClick={() =>
					deleteUserAccount({ email: 'scooty@nooty.com', password: 'asdqwe' })
				}
				color="warn"
			>
				Delete Account
			</DeleteAccountButton>
		</ProfileContainer>
	);
};

export default ProfileTab;
