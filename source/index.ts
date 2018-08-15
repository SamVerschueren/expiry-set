export default class ExpirySet<K = any> implements Set<K> {
	private readonly data: Map<K, number>;
	public readonly [Symbol.toStringTag]: 'Set' = 'Set';

	constructor(maxAge: number);
	constructor(maxAge: number, values: ReadonlyArray<K> | null | undefined);
	constructor(maxAge: number, iterable: Iterable<K>);
	constructor(private readonly maxAge: number, values?: ReadonlyArray<K> | Iterable<K> | null | undefined) {
		this.data = new Map();

		if (values) {										// tslint:disable-line:early-exit
			for (const key of values) {
				this.add(key);
			}
		}
	}

	get size() {
		return [...this.entries()].length;
	}

	add(key: K) {
		this.data.set(key, Date.now());

		return this;
	}

	clear() {
		this.data.clear();
	}

	delete(key: K) {
		const hasKey = this.has(key);

		if (hasKey) {
			this.data.delete(key);
		}

		return hasKey;
	}

	has(key: K) {
		const timestamp = this.data.get(key);

		return Boolean(timestamp && !this.isExpired([key, timestamp]));
	}

	values() {
		return this.createIterator(item => item[0]);
	}

	keys() {
		return this.values();
	}

	entries() {
		return this.createIterator<[K, K]>(item => [item[0], item[0]]);
	}

	forEach(callbackfn: (value: K, value2: K, set: Set<K>) => void, thisArg?: any) {
		for (const [key, value] of this.entries()) {
			callbackfn.apply(thisArg, [value, key, this]);
		}
	}

	[Symbol.iterator]() {
		return this.values();
	}

	private isExpired([key, timestamp]: [K, number]) {
		const isExpired = Date.now() - timestamp > this.maxAge;

		if (isExpired) {
			this.data.delete(key);
		}

		return isExpired;
	}

	private *createIterator<T>(projection: (item: [K, number]) => T) {
		for (const item of this.data.entries()) {
			if (!this.isExpired(item)) {
				yield projection(item);
			}
		}
	}
}

// Add support for CJS
module.exports = ExpirySet;
module.exports.default = ExpirySet;
