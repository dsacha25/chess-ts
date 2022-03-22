export interface Database {
	getAll<T>(collectionName: string, options?: any): Promise<T[]>;
	get<T>(collectionName: string, id: string): Promise<T | undefined>;
	create<T>(documentPath: string, id: string, item: T): Promise<void>;
	update(collectionName: string, id: string, item: any): Promise<void>;
	delete(id: string): Promise<void>;
}
