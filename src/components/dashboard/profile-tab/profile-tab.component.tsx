import React from 'react';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import Title from '../../common/title/title.styles';
import { DeleteAccountButton, ProfileContainer } from './profile-tab.styles';

const ProfileTab = () => {
	const { deleteUserAccount } = useActions();
	return (
		<ProfileContainer>
			<Title>Profile Page</Title>
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
