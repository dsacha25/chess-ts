import { isMatch } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import { useSelector } from '../../../hooks/use-selector/use-typed-selector.hook';
import { selectChessUser } from '../../../redux/user/user.selector';
import { UpdateCredentials } from '../../../utils/types/users/update-credentials/update-credentials';
import LoginModule from '../../auth/login-module/login-module.component';
import FormInput from '../../common/inputs/form-input/form-input.component';
import PhotoUploader from '../../common/inputs/photo-uploader/photo-uploader.component';
import Title from '../../common/title/title.styles';
import { TabTitle } from '../tab-styles/tab-styles..styles';
import {
	DeleteAccountButton,
	ProfileContainer,
	ProfileDataContainer,
	ReauthContainer,
	SubmitUpdateButton,
	UpdateProfileForm,
} from './profile-tab.styles';

const ProfileTab = () => {
	const user = useSelector((state) => selectChessUser(state));

	const { updateProfileInfo } = useActions();
	const [open, setOpen] = useState(false);
	const docRef = useRef<HTMLDivElement>(null);

	const { register, watch, getValues, setValue, handleSubmit } =
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

	const handleOpenReauthModule = () => {
		setOpen(!open);

		if (docRef.current) {
			docRef.current.scrollTop = 0;
		}
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
		<ProfileContainer ref={docRef}>
			<TabTitle>Profile Page</TabTitle>

			<UpdateProfileForm onSubmit={handleSubmit(onSubmit)}>
				<Title fontSize="20px">Update Profile</Title>
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
				<SubmitUpdateButton
					disabled={isMatch(user || {}, getValues())}
					color="main"
				>
					Update
				</SubmitUpdateButton>
			</UpdateProfileForm>

			<ReauthContainer>
				<Title fontSize="20px">Remove Profile</Title>
				{open && <LoginModule callback={() => setOpen(false)} />}
				<DeleteAccountButton
					disabled={open}
					onClick={handleOpenReauthModule}
					color="warn"
				>
					Delete Account
				</DeleteAccountButton>
			</ReauthContainer>
		</ProfileContainer>
	);
};

export default ProfileTab;
