export interface Query<T> {
	query(ref: any, field?: string, pageSize?: number): Promise<T>;
}
