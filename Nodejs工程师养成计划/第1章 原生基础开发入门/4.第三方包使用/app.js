const time = Date.now();
console.log(time);

const moment = require('moment');
console.log(moment(time).format("YYYY-MM-DD HH:mm:ss"));
