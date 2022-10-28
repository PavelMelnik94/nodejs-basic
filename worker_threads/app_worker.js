const factorial = require('./factorial');
const { Worker } = require('worker_threads');

const compute = ({ array }) => {
	return new Promise((resolve, reject) => {
		const worker = new Worker('./worker.js', {
			workerData: { array },
		});

		worker.on('message', (msg) => {
			console.log(worker.threadId);
			resolve(msg);
		});

		worker.on('error', (err) => {
			reject(err);
		});

		worker.on('exit', (err) => {
			console.log('Завершил работу');
		});
	});
};

const main = async () => {
	try {
		performance.mark('start');
		const result = await Promise.all([
			compute({ array: [25, 20] }),
			compute({ array: [25, 20] }),
			compute({ array: [25, 20] }),
			compute({ array: [25, 20] }),
			compute({ array: [25, 20] }),
		]);
		console.log(result);
		performance.mark('end');
		performance.measure('main', 'start', 'end');
		console.log(`время выполнения: ${parseInt(performance.getEntriesByName('main').pop().duration)} ms`);
	} catch (err) {
		console.error(err.message);
	}
};

main();
