import mapAgeCleaner from 'map-age-cleaner';

interface Entry {
	maxAge: number;
}

export default class ExpirySet<K = any> implements Set<K> {
	private readonly data: Map<K, Entry>;
	public readonly [Symbol.toStringTag]: 'Set' = 'Set';

	constructor(maxAge: number);
	constructor(maxAge: number, values: ReadonlyArray<K> | null | undefined);
	constructor(maxAge: number, iterable: Iterable<K>);
	constructor(private readonly maxAge: number, values?: ReadonlyArray<K> | Iterable<K> | null | undefined) {
		this.data = new Map<K, Entry>();
		mapAgeCleaner(this.data);

		if (values) {										// tslint:disable-line:early-exit
			for (const key of values) {
				this.add(key);
			}
		}
	}

	get size() {
		return this.data.size;
	}

	add(key: K) {
		this.data.set(key, {
			maxAge: Date.now() + this.maxAge
		});

		return this;
	}

	clear() {
		this.data.clear();
	}

	delete(key: K) {
		return this.data.delete(key);
	}

	has(key: K) {
		return this.data.has(key);
	}

	values() {
		return this.data.keys();
	}

	keys() {
		return this.data.keys();
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

	private *createIterator<T>(projection: (item: [K, Entry]) => T) {
		for (const item of this.data.entries()) {
			yield projection(item);
		}
	}
}

// Add support for CJS
module.exports = ExpirySet;
module.exports.default = ExpirySet;
