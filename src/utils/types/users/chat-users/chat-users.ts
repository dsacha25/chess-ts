export interface ChatUser {
	photoURL: string;
	uid: string;
}

export interface ChatUsers {
	sender?: ChatUser;
	receiver?: ChatUser;
}
