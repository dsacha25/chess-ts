import React from 'react';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import {
	AiLevelSelectContainer,
	AiLevelSelectOptions,
	SelectAiLevelButton,
} from './ai-level-select.styles';
import { BsCpuFill } from 'react-icons/bs';
import { TabTitle } from '../../../dashboard/tab-styles/tab-styles..styles';

const AiLevelSelect = () => {
	const { setAiLevel } = useActions();

	return (
		<AiLevelSelectContainer>
			<TabTitle>Choose AI Difficulty</TabTitle>
			<AiLevelSelectOptions>
				<SelectAiLevelButton onClick={() => setAiLevel(0)} color="main">
					<BsCpuFill size="30px" /> 1
				</SelectAiLevelButton>
				<SelectAiLevelButton onClick={() => setAiLevel(1)} color="main">
					<BsCpuFill size="30px" /> 2
				</SelectAiLevelButton>
				<SelectAiLevelButton onClick={() => setAiLevel(2)} color="main">
					<BsCpuFill size="30px" /> 3
				</SelectAiLevelButton>
				<SelectAiLevelButton onClick={() => setAiLevel(3)} color="secondary">
					<BsCpuFill size="30px" /> 4
				</SelectAiLevelButton>
				<SelectAiLevelButton onClick={() => setAiLevel(4)} color="secondary">
					<BsCpuFill size="30px" /> 5
				</SelectAiLevelButton>
			</AiLevelSelectOptions>
		</AiLevelSelectContainer>
	);
};

export default AiLevelSelect;
