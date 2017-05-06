if(typeof require != 'undefined'){
  window.fs = require('fs');
}
// Node-Webkit environment
if(typeof nw !== 'undefined'){
  var win = nw.Window.get();

  var app = {
    name : 'ClinicRegistry'
  }
}
