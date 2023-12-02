use std::env;
use std::fs;

fn test_game(line: &str, game_test: &(i32, i32, i32)) -> i32{
    let trials = line.split(':')
        .collect::<Vec<&str>>()[1]
        .split(';')
        .collect::<Vec<&str>>();
    let mut highest_values = (0,0,0);
    for trial in trials {
        let cube_counts = trial.split(',').collect::<Vec<&str>>();
        for cube_count in cube_counts {
            let cube_count_components = cube_count
                .trim()
                .split(' ')
                .collect::<Vec<&str>>();
            if(cube_count_components.len() != 2){
                panic!("Cube count {cube_count} had more than 2 elements");
            }
            let count = cube_count_components[0]
                .trim()
                .parse::<i32>()
                .unwrap();
            let color_name = cube_count_components[1].trim();
            let mut comparison_value = -1;
            if(color_name == "red"){
                comparison_value = game_test.0;
                if(count > highest_values.0){
                    highest_values.0 = count;
                }
            }
            else if(color_name == "green"){
                comparison_value = game_test.1;
                if(count > highest_values.1){
                    highest_values.1 = count;
                }
            }
            else if(color_name == "blue"){
                comparison_value = game_test.2;
                if(count > highest_values.2){
                    highest_values.2 = count;
                }
            }

            if(comparison_value == -1){
                panic!("Could not get index of color {color_name}");
            }

            /*if(count > comparison_value){
                return -1;
            }*/
        }
    }
    return highest_values.0 * highest_values.1 * highest_values.2;
}

fn main() {
    //Say hello. It's polite
    println!("Hello, world!");

    //Read the input file
    let input = fs::read_to_string("Day 2/input.txt")
        .expect("Failed to read the file.");
    let game_test = (12,13,14);
    let mut valid_game_numbers = Vec::new();
    for line in input.lines(){
        let game_number = (
            *line.split(':')
            .collect::<Vec<&str>>()[0]
            .split(" ")
            .collect::<Vec<&str>>()
            .last().unwrap()
        ).clone()
        .parse::<i32>()
        .unwrap();

        let game_result = test_game(line, &game_test);
        if game_result != -1 {
            println!("Result of game {line} is {game_result}");
            valid_game_numbers.push(game_result);
        }
    }

    let mut valid_game_number_sum = 0;
    for valid_game_number in valid_game_numbers{
        valid_game_number_sum += valid_game_number;
    }

    println!("The answer is {valid_game_number_sum}");
}
