import React, { MouseEvent } from 'react';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import Title from '../../../common/title/title.styles';
import {
	PromotionButton,
	PromotionSelectorContainer,
} from './promotion-selector.styles';
import { PromotionPieces } from '../../../../utils/types/promotion-pieces/promotion-pieces';

const PromotionSelector = () => {
	const { setPromotionPieceType } = useActions();
	const handlePromotionSelection = (e: MouseEvent<HTMLButtonElement>) => {
		const id = e.currentTarget.id as PromotionPieces;
		setPromotionPieceType(id);
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
			<PromotionButton onClick={handlePromotionSelection} id="n" color="main">
				N
			</PromotionButton>
		</PromotionSelectorContainer>
	);
};

export default PromotionSelector;
