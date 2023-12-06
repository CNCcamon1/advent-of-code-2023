//Import dependencies
const fs = require('fs');
const readline = require('readline');

//Say hello. It's polite.
console.log("Hello World.");

console.log("Opening input file...");
const filestream = fs.createReadStream('input.txt');

const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity
});

console.log("Success.");

class ValueMapping{
    constructor(destinationStart, sourceStart, length){
        this.destinationStart = destinationStart;
        this.sourceStart = sourceStart;
        this.rangeLength = length;
    }
}

function parse_seeds_line(line){
    let seeds = line.split(' ').slice(1);
    let rangeStart = null;
    let rangeLength = null;
    let totalSeedList = [];
    for(let i=0; i<seeds.length; i++){
        if(i % 2 == 0){
            rangeStart = seeds[i];
        }
        else{
            rangeLength = seeds[i];
            for(let j=0; j<rangeLength; j++){
                totalSeedList.push(rangeStart + j);
            }
            rangeStart = null;
            rangeLength = null;
        }
    }
}

function parse_line(line){
    let lineValues = line.split(' ');
    return new ValueMapping(lineValues[0], lineValues[1], lineValues[2]);
}

function calculate_next_mapping(
    currentMappingValue,
    mappings,
    mappingsIndex
){
    let currentMapping = mappings[mappingsIndex];
    let nextMappingValue = 0;
    for(let i=0; i<currentMapping.length; i++){
        let sourceOffset = currentMappingValue - currentMapping[i].sourceStart;
        if(sourceOffset > 0 && sourceOffset <= currentMapping[i].rangeLength){
            nextMappingValue = Number(currentMapping[i].destinationStart) + Number(sourceOffset);
            break;
        }
    }
    if(nextMappingValue == 0){
        nextMappingValue = currentMappingValue;
    }
    if(mappingsIndex  == 7){
        return nextMappingValue;
    }
    else{
        return calculate_next_mapping(nextMappingValue, mappings, mappingsIndex + 1);
    }
}

let seeds = [];
let mappings = [];
let stepParsing = -1;

rl.on('line', (line) => {
    if(stepParsing == -1){
        seeds = parse_seeds_line(line);
        stepParsing++;
    }
    else if(line.includes(':')){
        stepParsing++;
    }
    else if(line != ""){
        if(mappings[stepParsing] == undefined){
            mappings[stepParsing] = [];
        }
        mappings[stepParsing].push(parse_line(line));
    }

});

rl.on('close', function () {
    let minLocationNumber = Infinity;
    for(let i=0; i<seeds.length; i++){
        let seedLowestLocation = calculate_next_mapping(
            seeds[i],
            mappings,
            1
        );

        if(seedLowestLocation < minLocationNumber){
            minLocationNumber = seedLowestLocation;
        }
    }
    console.log("The answer is " + minLocationNumber);
})