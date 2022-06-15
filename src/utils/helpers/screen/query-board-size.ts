const queryBoardSize = (width: number): number => {
	if (width > 1500) {
		return 800;
	} else if (width <= 1500 && width > 1300) {
		return 700;
	} else if (width <= 1300 && width > 980) {
		return 500;
	} else if (width <= 980 && width > 300) {
		return width - 20;
	} else return width;
};

export default queryBoardSize;
