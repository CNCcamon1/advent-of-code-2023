package CamelCardHand;

public class CamelCardComparator implements java.util.Comparator<CamelCardHand> {
    @Override
    public int compare(CamelCardHand a, CamelCardHand b){
        int typeDifferential = a.HandType - b.HandType;
        if(typeDifferential != 0){
            return typeDifferential;
        }
        else{
            for(int i=-0; i<a.HandString.length(); i++){
                int aValue = characterToValue(a.HandString.charAt(i));
                int bValue = characterToValue(b.HandString.charAt(i));
                int differential = aValue - bValue;
                if(differential != 0){
                    return differential;
                }
            }
            return 0;
        }
    }

    private int characterToValue(char c){
        switch(c){
            case 'A':
                return 13;
            case 'K':
                return 12;
            case 'Q':
                return 11;
            case 'J':
                return 10;
            case 'T':
                return 9;
            default:
                return Character.getNumericValue(c) - 1;
        }
    }
}
