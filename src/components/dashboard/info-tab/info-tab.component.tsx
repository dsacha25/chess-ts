import React from 'react';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import FormInput from '../../common/inputs/form-input/form-input.component';
import Title from '../../common/title/title.styles';
import { TabTitle } from '../challenge-tab/challenge-tab.styles';
import {
	InfoContainer,
	Link,
	SocialsContainer,
	SubContainer,
} from './info-tab.styles';
import {
	AiFillFacebook,
	AiFillInstagram,
	AiFillLinkedin,
} from 'react-icons/ai';
import globalStyles from '../../../global-styles/global-styles';

const InfoTab = () => {
	return (
		<InfoContainer>
			<TabTitle>Information</TabTitle>
			<SubContainer>
				<Title fontSize="20px">About Us</Title>
				This site is managed and created by:
				<Link href="https://www.akton.blue">Akton LLC</Link>
				<SocialsContainer>
					<Link href="https://www.linkedin.com/company/aktōn-llc/">
						<AiFillLinkedin size="40px" color={globalStyles.main} />
					</Link>
					<Link href="https://www.facebook.com/atkon.blue/">
						<AiFillFacebook size="40px" color={globalStyles.main} />
					</Link>
					<Link href="https://www.instagram.com/akton.blue">
						<AiFillInstagram size="40px" color={globalStyles.main} />
					</Link>
				</SocialsContainer>
			</SubContainer>

			<SubContainer>
				<Title fontSize="20px">Contact Us</Title>
				Have your own project? Drop us a line
				<form>
					<FormInput placeholder="Full Name" />
					<FormInput placeholder="Email" />
					<FormInput placeholder="Tell us about your  project..." />
					<CustomButton color="main">Submit</CustomButton>
				</form>
			</SubContainer>
		</InfoContainer>
	);
};

export default InfoTab;
