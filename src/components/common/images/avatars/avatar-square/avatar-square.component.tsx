import React from 'react';
import { useSelector } from '../../../../../hooks/use-selector/use-typed-selector.hook';
import GenericContainer from '../../../containers/generic-container/generic-container.styles';
import { ProfilePicture } from './avatar-square.styles';
import DefaultPhoto from '../../../../../assets/default-photo/DefaultPhoto.png';

const AvatarSquare = () => {
	// const profilePicture = useSelector((state) => selectProfilePicture(state));

	return (
		<GenericContainer>
			<ProfilePicture url={DefaultPhoto} />
		</GenericContainer>
	);
};

export default AvatarSquare;
