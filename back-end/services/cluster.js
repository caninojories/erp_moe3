(function() {
  'use strict';

  module.exports = function(io) {

    /*Fork Workers*/
    var timeouts = [];
    /*Use a Vanilla for loop to fork our Clusters*/
    for (var i = 0; i < io.numCPUs; i++) {io.cluster.fork();}

    io.cluster.on('fork', function(worker) {
      timeouts[worker.id] = setTimeout(errorMsg, 2000);
    });

    io.cluster.on('online', function(worker) {
      console.log(worker.id + ' is online');
    });
    io.cluster.on('listening', function(worker, address) {
      clearTimeout(timeouts[worker.id]);
      console.log('A worker is now connected to ' + address.address + ':' + address.port);
    });
  };
  /*Function for using Error Message for the Worker*/
  function errorMsg() {
    //console.error('Something must be wrong with the connection ...');
  }
}());
