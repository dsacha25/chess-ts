import React from 'react';
import useActions from '../../../hooks/use-actions/use-actions.hook';
import Title from '../../common/title/title.styles';
import {
	AiLevelSelectContainer,
	AiLevelSelectOptions,
	SelectAiLevelButton,
} from './ai-level-select.styles';

const AiLevelSelect = () => {
	const { setAiLevel } = useActions();

	return (
		<AiLevelSelectContainer>
			<Title fontSize="40px">Choose AI Difficulty</Title>
			<AiLevelSelectOptions>
				<SelectAiLevelButton onClick={() => setAiLevel(0)} color="main">
					1
				</SelectAiLevelButton>
				<SelectAiLevelButton onClick={() => setAiLevel(1)} color="main">
					2
				</SelectAiLevelButton>
				<SelectAiLevelButton onClick={() => setAiLevel(2)} color="main">
					3
				</SelectAiLevelButton>
				<SelectAiLevelButton onClick={() => setAiLevel(3)} color="secondary">
					4
				</SelectAiLevelButton>
				<SelectAiLevelButton onClick={() => setAiLevel(4)} color="secondary">
					5
				</SelectAiLevelButton>
			</AiLevelSelectOptions>
		</AiLevelSelectContainer>
	);
};

export default AiLevelSelect;