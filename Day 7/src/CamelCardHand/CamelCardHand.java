package CamelCardHand;
public class CamelCardHand {

    public CamelCardHand(String line){
        this.HandString = line.split(" ")[0];
        this.Bid = Integer.parseInt(line.split(" ")[1]);
        CalculateHandType();
    }
    
    public int Bid;

    public String HandString;

    public int HandType;

    private void CalculateHandType(){
        char[] labels = new char[5];
        int[] labelCounts = new int[5];

        for(int i=0; i<HandString.length(); i++){
            char card = HandString.charAt(i);
            for(int j=0; j<labels.length; j++){
                if(labels[j] == '\u0000'){
                    labels[j] = card;
                    labelCounts[j] = 1;
                    break;
                }
                else if(labels[j] == card){
                    labelCounts[j]++;
                    break;
                }
            }
        }

        //Five of a Kind
        if(labelCounts[0] == 5){
            HandType = 7;
        }
        //Four of a Kind
        else if(labelCounts[0] == 4 && labelCounts[1] == 1){
            HandType = 6;
        }
        //Full House
        else if((labelCounts[0] == 3 && labelCounts[1] == 2)
            || (labelCounts[0] == 2 && labelCounts[1] == 3)){
            HandType = 5;
        }
        //Three of a kind
        else if(
            (labelCounts[0] == 3 && labelCounts[1] == 1 && labelCounts[2] == 1) ||
            (labelCounts[0] == 1 && labelCounts[1] == 3 && labelCounts[2] == 1) ||
            (labelCounts[0] == 1 && labelCounts[1] == 1 && labelCounts[2] == 3)
        ){
            HandType = 4;
        }
        //Two pair
        else if(
            (labelCounts[0] == 2 && labelCounts[1] == 2 && labelCounts[2] == 1) ||
            (labelCounts[0] == 2 && labelCounts[1] == 1 && labelCounts[2] == 2) ||
            (labelCounts[0] == 1 && labelCounts[1] == 2 && labelCounts[2] == 2)
        ){
            HandType = 3;
        }
        //One pair
        else if(
            (labelCounts[0] == 2) ||
            (labelCounts[1] == 2) ||
            (labelCounts[2] == 2) ||
            (labelCounts[3] == 2)
        ){
            HandType = 2;
        }
        //High card
        else{
            HandType = 1;
        }
    }
}
