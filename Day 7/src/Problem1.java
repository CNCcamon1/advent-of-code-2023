import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import CamelCardHand.CamelCardHand;
import CamelCardHand.CamelCardComparator;

public class Problem1{
    public static void main(String[] args){
        //Say hello. It's polite
        System.out.println("Hello World!");

        List<CamelCardHand> hands = new ArrayList<CamelCardHand>();
        try{
            File inputFile = new File("Day 7/input.txt");
            Scanner inputReader = new Scanner(inputFile);
            while(inputReader.hasNextLine()){
                hands.add(new CamelCardHand(inputReader.nextLine()));
            }

            hands.sort(new CamelCardComparator());
            int totalWinnings = 0;
            for(int i=0; i<hands.size(); i++){
                CamelCardHand hand = hands.get(i);
                totalWinnings += hand.Bid * (i + 1);
            }

            System.out.println("The answer is " + totalWinnings);
        }
        catch (FileNotFoundException e){
            System.out.println("An error occured.");
            e.printStackTrace();
        }
    }
}
