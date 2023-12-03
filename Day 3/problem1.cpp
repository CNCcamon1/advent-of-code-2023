#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <cctype>

typedef struct PartNumber{
    int index [2];
    int length;
} PartNumber;

bool is_character(std::vector<std::vector<char>>* input, int i, int j){
    if((*input)[i][j] != '.' && !isdigit((*input)[i][j])){
        return true;
    }
    else{
        return false;
    }
}

bool check_if_part_number_valid(
    PartNumber* partNumber, 
    std::vector<std::vector<char>>* input){

    bool valid = false;
    
    int lineIndex = partNumber->index[0];
    int currentIndexInLine = partNumber->index[1];
    bool currentIndexIsBeginning = true;
    bool currentIndexIsEnd = (currentIndexInLine - partNumber->index[1] + 1 == partNumber->length);

    while(
        (currentIndexInLine - partNumber->index[1] + 1) <= partNumber->length
    ) {
        //Check the line above
        if(lineIndex - 1 >= 0){
            //Check above the current position
            if(is_character(input, lineIndex - 1, currentIndexInLine)){
                valid = true;
                break;
            }

            if(currentIndexIsBeginning && currentIndexInLine > 0){
                //Check above and to the left of current position
                if(is_character(input, lineIndex - 1, currentIndexInLine - 1)){
                    valid = true;
                    break;
                }
            }

            if(currentIndexIsEnd && currentIndexInLine + 1 < (*input)[0].size()){
                //Check above and to the right of current position
                if(is_character(input, lineIndex - 1, currentIndexInLine + 1)){
                    valid = true;
                    break;
                }
            }
        }

        //Check the line below
        if(lineIndex + 1 < input->size()){
            //Check below the current position
            if(is_character(input, lineIndex + 1, currentIndexInLine)){
                valid = true;
                break;
            }

            if(currentIndexIsBeginning && currentIndexInLine > 0){
                //Check below and to the left of current position
                if(is_character(input, lineIndex + 1, currentIndexInLine - 1)){
                    valid = true;
                    break;
                }
            }

            if(currentIndexIsEnd && currentIndexInLine + 1 < (*input)[0].size()){
                //Check below and to the right of current position
                if(is_character(input, lineIndex + 1, currentIndexInLine + 1)){
                    valid = true;
                    break;
                }
            }
        }
        
        if(currentIndexIsBeginning && currentIndexInLine > 0){
            //Check to the left of current position
            if(is_character(input, lineIndex, currentIndexInLine - 1)){
                valid = true;
                break;
            }
        }

        if(currentIndexIsEnd && currentIndexInLine + 1 < (*input)[0].size()){
            //Check to the right of current position
            if(is_character(input, lineIndex, currentIndexInLine + 1)){
                valid = true;
                break;
            }
        }

        currentIndexInLine++;
        currentIndexIsBeginning = false;
        currentIndexIsEnd = (currentIndexInLine - partNumber->index[1] + 1 == partNumber->length);
    }

    return valid;
}

int get_part_number_value(
    PartNumber* partNumber,
    std::vector<std::vector<char>>* input){

    int value = 0;

    for(
        int i=partNumber->index[1]; 
        i - partNumber->index[1] + 1 <= partNumber->length; 
        i++
    ){
        int valueToAdd = (*input)[partNumber->index[0]][i] - '0';
        int power = partNumber->length - (i - partNumber->index[1]) - 1;
        for(int j = power; j > 0; j--){
            valueToAdd *= 10;
        }
        value += valueToAdd;
    }

    return value;
}

int main(){
    //Say hello. It's polite.
    std::cout << "Hello World!\n";

    //Read all the lines of the input into a big vector
    std::ifstream infile("input.txt");
    std::string line;
    std::vector<std::vector<char>> input;
    int lineNumber = 0;
    std::vector<PartNumber*> partNumbers;
    while(std::getline(infile, line)){
        std::vector<char> lineVector;
        PartNumber* partNumber = nullptr;
        for(int i=0; i<line.length(); i++){
            lineVector.push_back(line[i]);
            //Check if the character is a digit.
            if(isdigit(line[i])){
                //Check if there is already a PartNumber being processed
                if(partNumber == nullptr){
                    partNumber = new PartNumber();
                    partNumber->index[0] = lineNumber;
                    partNumber->index[1] = i;
                    partNumber->length = 1;
                }
                //If trhe digit is part of a larger number, increment length
                else{
                    partNumber->length++;
                }
            }
            else{
                //If it's not a digit, clear out the currently parsing number
                if(partNumber != nullptr){
                    partNumbers.push_back(partNumber);
                    partNumber = nullptr;
                }
            }
        }
        if(partNumber != nullptr){
            partNumbers.push_back(partNumber);
        }
        input.push_back(lineVector);
        lineNumber++;
    }

    //Iterate through the potential part numbers and check if they are valid
    int partNumberCount = 0;
    for(int i=0; i<partNumbers.size(); i++){
        bool partNumberIsValid = 
            check_if_part_number_valid(partNumbers[i], &input);
        if(partNumberIsValid){
            int partNumberValue =
                get_part_number_value(partNumbers[i], &input);
            partNumberCount += partNumberValue;
        }
    }

    std::cout << "The answer is " << partNumberCount << "\n";
}