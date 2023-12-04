#include <stdio.h>
#include <stdlib.h>

#define WINNING_NUMBERS_COUNT 10
#define YOUR_NUMBERS_COUNT 25

size_t getline(char **lineptr, size_t *n, FILE *stream) {
    char *bufptr = NULL;
    char *p = bufptr;
    size_t size;
    int c;

    if (lineptr == NULL) {
        return -1;
    }
    if (stream == NULL) {
        return -1;
    }
    if (n == NULL) {
        return -1;
    }
    bufptr = *lineptr;
    size = *n;

    c = fgetc(stream);
    if (c == EOF) {
        return -1;
    }
    if (bufptr == NULL) {
        bufptr = malloc(128);
        if (bufptr == NULL) {
            return -1;
        }
        size = 128;
    }
    p = bufptr;
    while(c != EOF) {
        if ((p - bufptr) > (size - 1)) {
            size = size + 128;
            bufptr = realloc(bufptr, size);
            if (bufptr == NULL) {
                return -1;
            }
        }
        *p++ = c;
        if (c == '\n') {
            break;
        }
        c = fgetc(stream);
    }

    *p++ = '\0';
    *lineptr = bufptr;
    *n = size;

    return p - bufptr - 1;
}

char* advance_past_card_number(char* line){
    char* currentCharacter = line;
    while(*currentCharacter != ':'){
        currentCharacter++;
    }
    return currentCharacter + 1;
}

int* get_winning_numbers(char* line){
    static int winningNumbers [WINNING_NUMBERS_COUNT];
    char* winningCardsBeginning = advance_past_card_number(line);
    char* currentCharacter = winningCardsBeginning + 1;
    int currentNum = 0;
    int numIndex = 0;
    while(*currentCharacter != '|'){
        if(*currentCharacter != ' '){
            currentNum += atoi(currentCharacter);
            currentCharacter++;
            currentCharacter++;
        }
        else{
            currentCharacter++;
            currentNum += atoi(currentCharacter);
            currentCharacter++;
        }
        //Skip the whitespace
        currentCharacter++;
        winningNumbers[numIndex] = currentNum;
        currentNum = 0;
        numIndex++;
    }

    return winningNumbers;
}

char* advance_past_winning_nums(char* line){
    char* currentCharacter = line;
    while(*currentCharacter != '|'){
        currentCharacter++;
    }
    return currentCharacter + 1;
}

int* get_your_numbers(char* line){
    static int yourNumbers [YOUR_NUMBERS_COUNT];
    char* yourNumbersBeginning = advance_past_winning_nums(line);
    char* currentCharacter = yourNumbersBeginning + 1;
    int currentNum = 0;
    int numIndex = 0;
    while(currentCharacter - line < strlen(line)){
        if(*currentCharacter != ' '){
            currentNum += atoi(currentCharacter);
            currentCharacter++;
            currentCharacter++;
        }
        else{
            currentCharacter++;
            currentNum += atoi(currentCharacter);
            currentCharacter++;
        }
        //Skip the whitespace
        currentCharacter++;
        yourNumbers[numIndex] = currentNum;
        currentNum = 0;
        numIndex++;
    }

    return yourNumbers;
}

int main(){
    //Say hello. It's polite.
    printf("Hello World!\n");

    FILE* fp;
    char* line = NULL;
    size_t len = 0;
    ssize_t read;

    fp = fopen("input.txt", "r");
    if (fp == NULL){
        exit(EXIT_FAILURE);
    }

    int totalWorth = 0;

    while((read = getline(&line, &len, fp)) != -1){
        int cardWorth = 0;
        int* winningNumbers = get_winning_numbers(line);
        int* yourNumbers = get_your_numbers(line);
        for(int i=0; i<YOUR_NUMBERS_COUNT; i++){
            for(int j=0; j<WINNING_NUMBERS_COUNT; j++){
                if(winningNumbers[j] == yourNumbers[i]){
                    if(cardWorth == 0){
                        cardWorth = 1;
                    }
                    else{
                        cardWorth *= 2;
                    }
                }
            }
        }
        totalWorth += cardWorth;
    }

    fclose(fp);
    if(line){
        free(line);
    }

    char* answerString = malloc(100);
    itoa(totalWorth,answerString, 10);
    printf("The answer is ");
    printf(answerString);
}