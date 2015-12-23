var noble = require('noble');
var app = require('child_process');

noble.on('stateChange', function(state) {
  if (state == 'poweredOn') {
    console.log('---BLUETOOTH ON, SCANNING FOR DEVICES---');
    noble.startScanning();
  }
});

noble.on('discover', function(peripheral) {

  var kbAddress = 'eb:ed:cd:cd:58:33';

  if (peripheral.address == kbAddress) {

    var kb = peripheral;
    var seil;

    kb.on('connect', function() {
      console.log('KEYBOARD CONNECTED!');
      seil = app.exec('open /Applications/Seil.app', function(err, stdin, stdout) {
        if (err) {
          console.log(err);
        }
      });
    });

    kb.on('disconnect', function() {
      console.log('KEYBOARD DISCONNECTED');
      if (seil) {
        seil.kill('SIGKILL');
      }
    });
  }

  peripheral.connect();
});
