type StrNum = string | number;

export type FENString =
	`${StrNum}/${StrNum}/${StrNum}/${StrNum}/${StrNum}/${StrNum}/${StrNum}/${StrNum} ${
		| 'w'
		| 'b'} ${string | '-'} ${string | '-'} ${number} ${string}`;

let FEN: FENString;

FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
