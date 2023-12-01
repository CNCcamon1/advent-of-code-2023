/*
* Avent of Code 2023
* Day 1
* Written by Camon Crocker
* 12/1/2023
*/

//Import dependencies
const fs = require('fs');
const readline = require('readline');


//Say hello. It's polite.
console.log("Hello World.");

//Read input file
console.log("Opening input file...");
const filestream = fs.createReadStream('input.txt');

const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity
});

console.log("Success.");

//Initialize array to hold the calibration values for each line
let calibrationValues = [];

//Iterate through each line and process it to retrieve the calibration value
rl.on('line', (line) => {
    //Initialize variables ot hold first and last digits
    let firstDigit = -1;
    let lastDigit = -1;

    //Iterate through each character of the line to check if it is a numeral
    for (let i=0; i < line.length; i++){
        //Try to parse the character as an int
        let digit = parseInt(line[i]);
        //If it parses successfully, use it as the first or last digit
        if(!isNaN(digit)){
            /*Assign the digit to the first or last depending on whether 
            the first has been found already */
            if(firstDigit == -1){
                firstDigit = digit;
            }
            else{
                lastDigit = digit;
            }
        }
    }

    //If there is only one digit in the line, duplicate it
    if(lastDigit == -1){
        lastDigit = firstDigit;
    }

    //Assemble the first and last digit into a two-digit number
    if(firstDigit != -1 && lastDigit != -1){
        calibrationValues.push((firstDigit * 10) + lastDigit);
    }
    //If an error occurs parsing a line, log it
    else{
        console.log("Error parsing line " + line);
    }
});

rl.on('close', function () {
    //Sum up all the calibration values
    let sum = 0;
    for (let i = 0; i < calibrationValues.length; i++){
        sum += calibrationValues[i];
    }

    console.log("The answer is " + sum);
})
