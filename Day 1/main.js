const fs = require('fs');

console.log("Hello World.");
console.log("Opening input file...");
fs.open('input.txt', 'r', process_input(err, f));

function process_input(err, f){
    if(err){
        return console.error(err);
    }

    console.log("Success.");
    
}