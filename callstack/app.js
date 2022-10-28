const perf_hook = require('perf_hooks');

const performanceObserver = new perf_hook.PerformanceObserver((list) => {
	console.log(list.getEntries());
	console.log(list.getEntries()[0]);
	const entry = list.getEntriesByName('slow').pop();
	console.log(`${entry.name} took ${entry.duration} ms`);
	performanceObserver.disconnect();
});

performanceObserver.observe({ entryTypes: ['measure'] });

function slow() {
	performance.mark('start');
	const arr = [];

	for (let i = 0; i < 100000000; i++) {
		arr.push(i * i);
	}

	performance.mark('end');
	performance.measure('slow', 'start', 'end');
}

slow();

console.log;
