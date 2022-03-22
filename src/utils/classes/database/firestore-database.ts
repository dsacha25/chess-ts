import { Observer } from '@firebase/util';
import { FirebaseApp } from 'firebase/app';
import {
	collection,
	CollectionReference,
	Firestore,
	getDocs,
	getDoc,
	deleteDoc,
	updateDoc,
	setDoc,
	doc,
	query,
	getFirestore,
	QueryDocumentSnapshot,
	DocumentSnapshot,
	DocumentData,
	QueryConstraint,
	QuerySnapshot,
	UpdateData,
	onSnapshot,
	Unsubscribe,
	DocumentReference,
} from 'firebase/firestore';
import { Database } from './database';

export type Doc = DocumentSnapshot<DocumentData>;

export class FirestoreDatabase implements Database {
	private db: Firestore;
	private collection: CollectionReference<any>;

	constructor(collectionName: string, app: FirebaseApp) {
		this.db = getFirestore(app);
		this.collection = this.getCollection<DocumentData>(collectionName);
	}

	convertSnapshot<T>(snapshot: QuerySnapshot<T>): T[] {
		return snapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
	}

	convertDocSnapshot<T>(snapshot: DocumentSnapshot<T>): T | undefined {
		if (snapshot.exists()) {
			return { ...snapshot.data(), id: snapshot.id };
		}
	}

	getCollection<T>(collectionName: string): CollectionReference<T> {
		return collection(this.db, collectionName).withConverter<T>({
			toFirestore: (data: T) => {
				return data;
			},
			fromFirestore: (snap: QueryDocumentSnapshot<T>) => {
				return snap.data() as T;
			},
		});
	}

	setCollection<T>(collectionName: string): void {
		this.collection = this.getCollection<T>(collectionName);
	}

	// Fetch all documents within specified collection
	async getAll<T>(
		collectionName: string,
		...queryContstraints: QueryConstraint[]
	): Promise<T[]> {
		this.setCollection(collectionName);
		let pendingQuery = query<T>(this.collection, ...queryContstraints);

		const snapshot = await getDocs(pendingQuery);
		return this.convertSnapshot<T>(snapshot);
	}

	async get<T>(collectionName: string, id: string): Promise<T | undefined> {
		const collectionRef = this.getCollection<T>(collectionName);
		const docRef = doc<T>(collectionRef, id);
		const snapshot = await getDoc<T>(docRef).catch((err) => {
			console.error(err);
		});
		if (snapshot) return this.convertDocSnapshot<T>(snapshot);
	}

	getDocumentReference(documentPath: string): DocumentReference {
		return doc(this.db, documentPath);
	}

	async create<T>(collectionPath: string, id: string, item: T): Promise<void> {
		const collectionRef = this.getCollection<T>(collectionPath);
		const docRef = doc(collectionRef, id);
		await setDoc(docRef, item);
	}

	async update(
		collectionName: string,
		id: string,
		item: UpdateData<any>
	): Promise<void> {
		const collectionRef = this.getCollection(collectionName);
		this.setCollection(collectionName);
		const docRef = doc(collectionRef, id);
		await updateDoc(docRef, item).catch((err) => {
			console.error(err);
		});
	}

	async delete(id: string): Promise<void> {
		const docRef = doc(this.db, this.collection.id, id);
		await deleteDoc(docRef)
			.then(() => {
				console.log(`Document ${id} deleted`);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	openDocumentListener<T>(
		collectionName: string,
		id: string,
		observer: Observer<DocumentSnapshot<T>>
	): Unsubscribe {
		const collectionRef = this.getCollection<T>(collectionName);
		const documentRef = doc<T>(collectionRef, id);

		const unsubscribe = onSnapshot<T>(documentRef, observer);
		return unsubscribe;
	}

	openCollectionListener<T>(
		collectionName: string,
		queryContstraints: QueryConstraint[],
		observer: Observer<QuerySnapshot<T>>
	): Unsubscribe {
		const collectionRef = this.getCollection<T>(collectionName);
		let pendingQuery = query<T>(collectionRef, ...queryContstraints);

		const unsubscribe = onSnapshot<T>(pendingQuery, observer);
		return unsubscribe;
	}
}
