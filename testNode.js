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
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
