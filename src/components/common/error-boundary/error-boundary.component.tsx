import React, { Component } from 'react';
import {
	ErrorBoundaryContainer,
	ErrorImageContainer,
	ErrorImageOverlay,
	ErrorImageText,
} from './error-boundary.styles';

export default class ErrorBoundary extends Component {
	state = {
		hasErrored: false,
	};

	static getDerivedStateFromError() {
		return { hasErrored: true };
	}

	componentDidCatch(error: any, info: any) {
		console.log('Error:  ', error);
		console.log('Info: ', info);
	}

	render() {
		if (this.state.hasErrored) {
			return (
				<ErrorBoundaryContainer>
					<ErrorImageOverlay>
						<ErrorImageContainer />
						<ErrorImageText>Sorry, this page is broken.</ErrorImageText>
					</ErrorImageOverlay>
				</ErrorBoundaryContainer>
			);
		}

		return this.props.children;
	}
}
