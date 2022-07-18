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
import { Navigate, useNavigate } from 'react-router-dom';
import Paths from '../../utils/types/util/paths/paths';
import { useSelector } from '../../hooks/use-selector/use-typed-selector.hook';
import { selectUserAuth } from '../../redux/user/user.selector';

const HomePage = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => selectUserAuth(state));

	return user ? (
		<Navigate to="dashboard" />
	) : (
		<HomePageContainer>
			<HomeIconWrapper>
				<ImageContainer url={QueenIcon} />
			</HomeIconWrapper>
			<Title margin="0" fontWeight="800" fontSize="80px" letterSpacing="0.5rem">
				Blunder City
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
					color="light"
				>
					Log In
				</HomeActionButton>
			</ButtonsContainer>
		</HomePageContainer>
	);
};

export default HomePage;
