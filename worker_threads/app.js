const factorial = require('./factorial');

const compute = (array) => {
	const arr = [];
	for (let i = 0; i < 100000000; i++) arr.push(i * i);
	return array.map((el) => factorial(el));
};

const main = () => {
	performance.mark('start');
	const result = [compute([25, 20]), compute([25, 20]), compute([25, 20]), compute([25, 20]), compute([25, 20])];
	console.log(result);
	performance.mark('end');
	performance.measure('main', 'start', 'end');
	console.log(`время выполнения: ${parseInt(performance.getEntriesByName('main').pop().duration)} ms`);
};

main();
