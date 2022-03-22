export const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
};

export const getScrollPosition = () => {
	const { scrollTop } = window;

	console.log(scrollTop);

	return {
		scrollTop,
	};
};
