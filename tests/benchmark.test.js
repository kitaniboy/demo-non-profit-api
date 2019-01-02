const siege = require('siege');

let path = {
  dev: 'node ./bin/www',
  prod: 'node ./cluster.js'
}

// testing routes
siege(path.dev)
  .wait(2000) // server need time to start so added 2 secs
  .on(3000) // port
  .for(10000).times
  .get('/visits')
  .attack()

// TODO: test post, patch and delete routes