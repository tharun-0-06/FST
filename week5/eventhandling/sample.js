var events = require('events');
var eventEmitter = new events.EventEmitter();
var connectHandler = function connected() 
{
 console.log('connection successful.');
}
eventEmitter.on('connection', connectHandler);
eventEmitter.on('data_received', function()
{
 console.log('data received successfully.');
});
eventEmitter.emit('connection');
eventEmitter.emit('data_received');
console.log("Program Ended.");