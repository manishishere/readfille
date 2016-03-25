var fs = require("fs");

// Asynchronous read
fs.readFile('abc.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});

console.log("after.........");
