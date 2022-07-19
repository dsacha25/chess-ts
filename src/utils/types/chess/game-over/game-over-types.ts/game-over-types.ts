enum GameOverTypes {
	CHECKMATE = 'CHECKMATE',
	TIMEOUT = 'TIMEOUT',
	ABANDONMENT = 'ABANDONMENT',
	RESIGNATION = 'RESIGNATION',
	DRAW_STALEMATE = 'DRAW_STALEMATE',
	DRAW_AGREEMENT = 'DRAW_AGREEMENT',
	DRAW_50_MOVE = 'DRAW_50_MOVE',
	DRAW_REPETITION = 'DRAW_REPETITION',
	DRAW_INSUFFICIENT_MATERIAL = 'DRAW_INSUFFICIENT_MATERIAL',
}

export default GameOverTypes;
