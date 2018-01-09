var moment = require('moment');
var now = moment();

//console.log(now.format());
//console.log(now.format('X'));
//console.log(now.valueOf());

var timestamp = 1515372268027;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.local().format('h:mm a'));
var x = "100" + "400";
console.log(x);

//console.log(now.format());
//
//console.log(now.format("MMMM Do YYYY, h:mm a")); 
//// h-12-hours, H-24-hours,  m-munites, A/a-AM/pm, DDDD-fullday, MMMM-fullmonth, YYYY-fullyear 