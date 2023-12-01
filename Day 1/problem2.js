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

function parse_digit(digit){
    //First, try and parse it as an int directly
    let parsedDigit = parseInt(digit);
    if(!isNaN(parsedDigit)){
        return parsedDigit;
    }

    //Next, see if it matches the name of a digit
    switch(digit.toLowerCase()){
        case "one":
            return 1;
        case "two":
            return 2;
        case "three":
            return 3;
        case "four":
            return 4;
        case "five":
            return 5;
        case "six":
            return 6;
        case "seven":
            return 7;
        case "eight":
            return 8;
        case "nine":
            return 9;
        case "ight":
            return 8;
        case "ne":
            return 1;
        case "ine":
            return 9;
        case "hree":
            return 3;
        case "wo":
            return 2;
    }

}

//Initialize array to hold the calibration values for each line
let calibrationValues = [];

//Iterate through each line and process it to retrieve the calibration value
rl.on('line', (line) => {
    //Initialize variables ot hold first and last digits
    let firstDigit = -1;
    let lastDigit = -1;
    console.log("Parsing line " + line);
    //Iterate through each character of the line to check if it is a numeral
    let digitMatchRegex = /([1-9]|(one|two|three|four|five|six|seven|eight|nine|(?<=e)ight|(?<=o)ne|(?<=n)ine)|(?<=t)hree|(?<=t)wo)/g;
    let matches = line.match(digitMatchRegex);
    for(let i = 0; i < matches.length; i++){
        let digit = parse_digit(matches[i]);
        /*Assign the digit to the first or last depending on whether 
        the first has been found already */
        if(firstDigit == -1){
            firstDigit = digit;
        }
        else{
            lastDigit = digit;
        }
    }

    //If there is only one digit in the line, duplicate it
    if(lastDigit == -1){
        lastDigit = firstDigit;
    }

    //Assemble the first and last digit into a two-digit number
    if(firstDigit != -1 && lastDigit != -1){
        //console.log("Successfully parsed values " + firstDigit + " and " + lastDigit + " from line " + line);
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
