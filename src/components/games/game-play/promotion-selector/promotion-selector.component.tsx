import React, { MouseEvent } from 'react';
import Title from '../../../common/title/title.styles';
import {
	PromotionButton,
	PromotionSelectorContainer,
} from './promotion-selector.styles';

const PromotionSelector = () => {
	const handlePromotionSelection = (e: MouseEvent<HTMLButtonElement>) => {
		console.log('ID', e.currentTarget.id);
	};

	return (
		<PromotionSelectorContainer>
			<Title>Select Promotion Piece</Title>
			<PromotionButton onClick={handlePromotionSelection} id="q" color="main">
				Q
			</PromotionButton>
			<PromotionButton onClick={handlePromotionSelection} id="r" color="main">
				R
			</PromotionButton>
			<PromotionButton onClick={handlePromotionSelection} id="b" color="main">
				B
			</PromotionButton>
			<PromotionButton onClick={handlePromotionSelection} id="k" color="main">
				K
			</PromotionButton>
		</PromotionSelectorContainer>
	);
};

export default PromotionSelector;
