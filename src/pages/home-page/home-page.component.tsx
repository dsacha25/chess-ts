import React from 'react';
import {
	HomePageContainer,
	HomeActionButton,
	ButtonsContainer,
	HomeIconWrapper,
} from './home-page.styles';
import QueenIcon from '../../assets/logo-icon/queen_icon.png';
import ImageContainer from '../../components/common/containers/image-container/image-container.component';
import Title from '../../components/common/title/title.styles';
import { useNavigate } from 'react-router-dom';
import Paths from '../../utils/types/paths/paths';

const HomePage = () => {
	const navigate = useNavigate();
	return (
		<HomePageContainer>
			<HomeIconWrapper>
				<ImageContainer url={QueenIcon} />
			</HomeIconWrapper>
			<Title margin="0" fontWeight="800" fontSize="80px" letterSpacing="0.5rem">
				Fuck Chess
			</Title>
			<ButtonsContainer>
				<HomeActionButton
					onClick={() => navigate(`/${Paths.CREATE_ACCOUNT}`)}
					color="main"
				>
					Create Account
				</HomeActionButton>
				<HomeActionButton
					onClick={() => navigate(`/${Paths.LOGIN}`)}
					color="warn"
				>
					Log In
				</HomeActionButton>
			</ButtonsContainer>
		</HomePageContainer>
	);
};

export default HomePage;