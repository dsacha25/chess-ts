import { User } from 'firebase/auth';
import {
	DocumentReference,
	onSnapshot,
	query,
	QueryConstraint,
} from 'firebase/firestore';
import { END, EventChannel, eventChannel } from 'redux-saga';
import {
	call,
	CallEffect,
	ChannelTakeEffect,
	fork,
	ForkEffect,
	take,
	TakeEffect,
	takeLatest,
} from 'redux-saga/effects';
import { auth, db } from '../firestore/firestore-app';

export class SagaListener {
	*closeListener<T>(channel: EventChannel<T>): Generator {
		yield channel.close();
	}

	*onListenerClose<T>(channel: EventChannel<T>, ACTION: string): Generator {
		yield takeLatest(ACTION, this.closeListener, channel);
	}

	*setListener<T>(
		channel: EventChannel<T>,
		callback: (args?: any) => any
	): Generator<ChannelTakeEffect<T>> | CallEffect<T> | TakeEffect {
		try {
			while (true) {
				const channelProps: ChannelTakeEffect<T> = yield take(channel);

				if (channelProps) {
					yield call(callback, channelProps);
				}
			}
		} catch (err) {
			yield console.error('Set Listener Error: ', err);
			yield channel.close();
		}
	}

	*initializeListener<T>(
		listener: () => EventChannel<T>,
		callback: (args?: any) => any
	): Generator<CallEffect | ForkEffect> | CallEffect<EventChannel<T>> {
		const channel: EventChannel<T> = yield call(listener);
		yield fork(this.setListener, channel, callback);
	}

	*initializeChannel<T>(
		channel: EventChannel<T>,
		callback: (args?: any) => any
	): Generator<CallEffect | ForkEffect> {
		yield fork(this.setListener, channel, callback);
	}

	generateDocumentListener<T>(
		query: DocumentReference<T>,
		includeId?: boolean
	): EventChannel<T> {
		return eventChannel((emitter) => {
			const unsubscribe = onSnapshot(query, (snapshot) => {
				if (snapshot.exists()) {
					if (includeId) {
						return emitter({ ...snapshot.data(), id: snapshot.id });
					} else {
						return emitter({ ...snapshot.data() });
					}
				} else {
					emitter(END);
				}
			});

			return unsubscribe;
		});
	}

	generateCollectionListener<T>(
		collectionName: string,
		constraints: QueryConstraint[]
	): EventChannel<unknown> {
		const collectionRef = db.getCollection<T>(collectionName);
		return eventChannel<any>((emitter) => {
			const unsubscribe = onSnapshot(
				query<T>(collectionRef, ...constraints),
				(snapshot) => {
					if (!snapshot.empty) {
						emitter(
							snapshot.docs.map((doc) => ({
								...doc.data(),
								id: doc.id,
							}))
						);
					} else {
						emitter('No subscriptions found.');
					}
				}
			);

			return unsubscribe;
		});
	}

	generateAuthListener(): EventChannel<User | null | string> {
		return eventChannel((emitter) => {
			const unsubscribe = auth.onAuthChange((user) => {
				if (user) {
					console.log('AUTH LISTENER');
					emitter(user);
				} else {
					console.log('NO USER FOUND');
					const error = 'No User';
					emitter(error);
				}
			});

			return unsubscribe;
		});
	}

	countdown = (secs: number): EventChannel<unknown> =>
		eventChannel((emitter) => {
			const iv = setInterval(() => {
				secs -= 1;
				if (secs > 0) {
					emitter(secs);
				} else {
					emitter(END);
				}
			}, 1000);

			return () => {
				clearInterval(iv);
			};
		});
}

export const listener = new SagaListener();
