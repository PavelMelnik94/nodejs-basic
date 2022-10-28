const { fork } = require('child_process');

const forkProcess = fork('fork.js');

forkProcess.on('message', (message) => {
	console.log(`Message from fork: ${message}`);
});

forkProcess.on('close', (statusCode) => {
	console.log(`Fork process exited with code: ${statusCode}`);
});

forkProcess.send('ping');
forkProcess.send('disconnect');
