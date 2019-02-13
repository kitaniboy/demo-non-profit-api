const os = require('os');
const cluster = require('cluster');

if (cluster.isMaster) {
  // Master process
  console.log(`Master ${process.pid} is running`);

  const n_cpus = os.cpus().length;
  console.log(`Forking ${n_cpus} CPUs`);
  for (let i = 0; i < n_cpus; i++) {
    cluster.fork();
  }

  // Listen for dying processes
  cluster.on('exit', () => {
    cluster.fork();
    console.log(`worker ${process.pid} died`);
  });
} else {
  // Worker process
  require('./bin/www');
}