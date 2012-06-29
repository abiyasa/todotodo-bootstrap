/**
 * Module dependencies.
 */
var express = require('express'),
    app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.use(express.static(__dirname + '/.'));  
});

// starts
var portNum = 3000;
app.listen(portNum);
console.log("Express server listening on port %d in %s mode", portNum, app.settings.env);
