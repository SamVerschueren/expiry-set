/* tslint:disable:await-promise */
import test from 'ava';
import delay from 'delay';
import ExpirySet from '.';

test('constructor', t => {
	const map = new ExpirySet<string>(1000, [
		'foo'
	]);

	t.true(map.has('foo'));
});

test('.size', async t => {
	const map = new ExpirySet<string>(1000);
	map.add('foo');

	await delay(500);

	map.add('unicorn');

	t.is(map.size, 2);

	await delay(600);

	t.is(map.size, 1);

	await delay(500);

	t.is(map.size, 0);
});

test('.clear', t => {
	const set = new ExpirySet<string>(1000);
	set.add('unicorn');
	set.add('rainbow');

	t.true(set.has('unicorn'));
	t.true(set.has('rainbow'));

	set.clear();

	t.false(set.has('foo'));
	t.false(set.has('unicorn'));
	t.false(set.has('rainbow'));
});

test('.delete', async t => {
	const set = new ExpirySet<string>(1000);
	set.add('unicorn');
	set.add('rainbow');

	t.true(set.has('unicorn'));
	t.true(set.has('rainbow'));

	t.true(set.delete('unicorn'));

	t.false(set.has('foo'));
	t.false(set.has('unicorn'));
	t.true(set.has('rainbow'));

	await delay(1100);

	t.false(set.delete('rainbow'));
});

test('.has', async t => {
	const set = new ExpirySet<string>(1000);
	set.add('unicorn');

	await delay(500);

	t.true(set.has('unicorn'));

	await delay(600);

	t.false(set.has('unicorn'));
});

test('.keys', async t => {
	const set = new ExpirySet<string>(1000);
	set.add('unicorn');
	set.add('rainbow');

	let result = [];

	for (const value of set.keys()) {
		result.push(value);
	}

	t.deepEqual(result, ['unicorn', 'rainbow']);

	await delay(1100);

	result = [];

	for (const value of set.values()) {
		result.push(value);
	}

	t.deepEqual(result, []);
});

test('.values', async t => {
	const set = new ExpirySet<string>(1000);
	set.add('unicorn');
	set.add('rainbow');

	let result = [];

	for (const value of set.values()) {
		result.push(value);
	}

	t.deepEqual(result, ['unicorn', 'rainbow']);

	await delay(1100);

	result = [];

	for (const value of set.values()) {
		result.push(value);
	}

	t.deepEqual(result, []);
});

test('.entries', async t => {
	const set = new ExpirySet<string>(1000);
	set.add('unicorn');

	await delay(500);

	set.add('rainbow');

	const result = [];

	for (const entry of set.entries()) {
		result.push(entry);
	}

	t.deepEqual(result, [
		['unicorn', 'unicorn'],
		['rainbow', 'rainbow']
	]);

	await delay(600);

	for (const entry of set.entries()) {
		t.deepEqual(entry, ['rainbow', 'rainbow']);
	}

	await delay(500);

	for (const _ of set) {
		t.fail();
	}
});

test('.forEach', async t => {
	const set = new ExpirySet<string>(1000);
	set.add('unicorn');

	await delay(500);

	set.add('rainbow');

	let result: any = [];

	set.forEach((value, key) => {
		result.push([key, value]);
	});

	t.deepEqual(result, [
		['unicorn', 'unicorn'],
		['rainbow', 'rainbow']
	]);

	await delay(600);

	result = [];

	set.forEach((value, key) => {
		result.push([key, value]);
	});

	t.deepEqual(result, [
		['rainbow', 'rainbow']
	]);
});

test('iterator', async t => {
	const set = new ExpirySet<string>(1000);
	set.add('unicorn');

	await delay(500);

	set.add('rainbow');

	const result = [];

	for (const entry of set) {
		result.push(entry);
	}

	t.deepEqual(result, [
		'unicorn',
		'rainbow'
	]);

	await delay(600);

	for (const entry of set) {
		t.is(entry, 'rainbow');
	}

	await delay(500);

	for (const _ of set) {
		t.fail();
	}
});
