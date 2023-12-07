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

function parse_line(line){
    let lineValues = line.split(' ');
    return new ValueMapping(Number(lineValues[0]), Number(lineValues[1]), Number(lineValues[2]));
}

function calculate_next_mapping(
    currentSourceStart,
    currentSourceEnd,
    mappings,
    mappingsIndex
){
    let currentMapping = mappings[mappingsIndex];
    let nextRanges = [];
    while(currentSourceStart != -1){
        let currentRangeMapped = false;
        let bestNonFitOffset = -Infinity;
        let bestNonFitIndex = -1;
        for(let i=0; i<currentMapping.length; i++){
            let sourceStartOffset = currentSourceStart - currentMapping[i].sourceStart;
            if(sourceStartOffset >= 0){
                //The current range starts after the current destination range
                if(sourceStartOffset < currentMapping[i].rangeLength){
                    //Current source start is in range for this destination range
                    let destinationEnd = -1;
                    if(currentSourceEnd <= currentMapping[i].sourceStart + currentMapping[i].rangeLength - 1){
                        //The current source range ends within this destination range
                        destinationEnd = currentMapping[i].destinationStart + currentMapping[i].rangeLength -
                        1 - ((currentMapping[i].sourceStart + currentMapping[i].rangeLength - 1)
                        - currentSourceEnd)
                        currentSourceStart = -1;
                    }
                    else{
                        //The destination range ends before the source range does
                        destinationEnd = currentMapping[i].destinationStart + currentMapping[i].rangeLength - 1;
                        currentSourceStart = currentMapping[i].sourceStart + currentMapping[i].rangeLength;

                    }
                    nextRanges.push({"destinationStart": currentMapping[i].destinationStart + sourceStartOffset, 
                        "destinationEnd": destinationEnd});
                    currentRangeMapped = true;
                    if(currentSourceStart == -1){
                        break;
                    }
                }
            }
            else{
                if(sourceStartOffset > bestNonFitOffset){
                    bestNonFitOffset = sourceStartOffset;
                    bestNonFitIndex = i;
                }
            }

        }
        if(!currentRangeMapped && bestNonFitIndex != -1){
            nextRanges.push({"destinationStart": currentSourceStart, 
                "destinationEnd": currentMapping[bestNonFitIndex].sourceStart});
            break;
        }
        else if(!currentRangeMapped){
            nextRanges.push({"destinationStart": currentSourceStart, 
                "destinationEnd": currentSourceEnd});
            break;
        }
    }
    if(mappingsIndex  == 7){
        nextRanges = nextRanges.sort((a,b) => a["destinationStart"] - b["destinationStart"]);
        return nextRanges[0]["destinationStart"];
    }
    else{
        let lowestLocationValue = Infinity;
        for(let i=0; i<nextRanges.length; i++){
            let locationValueForNextRange = calculate_next_mapping(nextRanges[i]["destinationStart"], 
                nextRanges[i]["destinationEnd"], mappings, mappingsIndex + 1);
            if(locationValueForNextRange < lowestLocationValue){
                lowestLocationValue = locationValueForNextRange;
            }
        }
        return lowestLocationValue;
    }
}

let seedsLine = "";
let mappings = [];
let stepParsing = -1;

rl.on('line', (line) => {
    if(stepParsing == -1){
        seedsLine = line;
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
    let seeds = seedsLine.split(' ').slice(1);
    let rangeStart = null;
    let rangeLength = null;
    for(let i=0; i<seeds.length; i++){
        if(i % 2 == 0){
            rangeStart = Number(seeds[i]);
        }
        else{
            rangeLength = Number(seeds[i]);
            let lowestLocationForRange = 
                calculate_next_mapping(rangeStart, rangeStart+rangeLength, mappings, 1);
            if(lowestLocationForRange < minLocationNumber){
                console.log("Updating minimum location number to  "+ lowestLocationForRange);
                minLocationNumber = lowestLocationForRange;
            }
            rangeStart = null;
            rangeLength = null;
        }
    }
    console.log("The answer is " + minLocationNumber);
})