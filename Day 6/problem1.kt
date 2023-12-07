/*
Notes:
Time holding button: h
Distance travelled: d
Race length: l
Distance to beat: m

d = h * (l - h) = hl - h^2 = -h^2 + hl
h = (-l +- sqrt(l^2 - 4(-1)(0)) / -2
  = (-l +- sqrt(l^2)) / -2
  =  (-l +- l) / -2
  = 0 && l
d = 0 when h = 0 && l

d > m when
    -h^2 + hl > m
    h(l-h) > m
    l-h > m/h

l is fixed. Find whole values of h that satisfy above
To find upper and lower bounds of h, set y-intercept equal to m and solve quadratic
-h^2 + hl - m
h = (-l +- sqrt(l^2 - 4(-1)(-m)))/-2
  = (-l +- sqrt(l^2 - 4m))/-2

*/
import java.io.File
import kotlin.math.sqrt
import kotlin.math.pow
import kotlin.math.ceil

fun get_win_permutations(l: Int, m: Int): Int{
  var hLower = ((-1 * l) + sqrt(((l * l) - (4 * m)).toDouble())) / -2
  var hUpper = ((-1 * l) - sqrt(((l * l) - (4 * m)).toDouble())) / -2

  var minH: Int
  var maxH: Int
  val hLowerInt = ceil(hLower).toInt()
  if(hLowerInt > hLower){
    minH = hLowerInt
  }
  else{
    minH = hLowerInt + 1
  }

  val hUpperInt = hUpper.toInt()
  if(hUpperInt < hUpper){
    maxH = hUpperInt
  }
  else{
    maxH = hUpperInt - 1
  }

  return maxH - minH + 1
}

fun parseStringToListOfInts(input: String): List<Int> {
  return input.split("\\s+".toRegex())
      .filter { it.isNotBlank() }
      .map { it.toInt() }
}

fun main() {
  //Say hello. It's polite
  println("Hello World!")

  //Parse input
  val fileLines: List<String> = File("input.txt").readLines()
  val gameTimesLine: String = fileLines[0].split(":")[1]
  val gameDistancesLine: String = fileLines[1].split(":")[1]
  val gameLengths: List<Int> = parseStringToListOfInts(gameTimesLine.trim())
  println("Game Times: $gameLengths")
  val gameDistances: List<Int> = parseStringToListOfInts(gameDistancesLine.trim())
  println("Game Distances: $gameDistances")

  var winPermutations: Int = 1
  for(gameLength in gameLengths){
    winPermutations *= get_win_permutations(gameLength, gameDistances[gameLengths.indexOf(gameLength)])
  }

  println("The answer is $winPermutations")
}