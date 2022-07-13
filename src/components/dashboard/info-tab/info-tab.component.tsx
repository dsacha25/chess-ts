import React from 'react';
import CustomButton from '../../common/buttons/custom-button/custom-button.component';
import FormInput, {
	FormInputTextArea,
} from '../../common/inputs/form-input/form-input.component';
import Title from '../../common/title/title.styles';
import {
	ContactForm,
	Container,
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
import { TabContent, TabTitle } from '../tab-styles/tab-styles..styles';

const InfoTab = () => {
	return (
		<InfoContainer>
			<TabTitle>Information</TabTitle>
			<TabContent>
				<SubContainer>
					<Title fontSize="20px">About Us</Title>
					<Container>
						This site was created by:
						<Link href="https://www.akton.blue">Akton LLC</Link>
						<SocialsContainer>
							<Link href="https://www.linkedin.com/company/aktōn-llc/">
								<AiFillLinkedin size="50px" color={globalStyles.main} />
							</Link>
							<Link href="https://www.facebook.com/atkon.blue/">
								<AiFillFacebook size="50px" color={globalStyles.main} />
							</Link>
							<Link href="https://www.instagram.com/akton.blue">
								<AiFillInstagram size="50px" color={globalStyles.main} />
							</Link>
						</SocialsContainer>
					</Container>
				</SubContainer>

				<SubContainer>
					<Title fontSize="20px">Contact Us</Title>
					<Container>
						<p>Have your own project? Drop us a line</p>
						<ContactForm>
							<FormInput placeholder="Full Name" />
							<FormInput placeholder="Email" />
							<FormInputTextArea placeholder="Tell us about your  project..." />
							<CustomButton color="main">Submit</CustomButton>
						</ContactForm>
					</Container>
				</SubContainer>
			</TabContent>
		</InfoContainer>
	);
};

export default InfoTab;
