import java.util.Scanner;

public class Q08_ShiftText {
    public static void main(String[] args) {
        Q08_ShiftText shiftText = new Q08_ShiftText();
        Scanner scanner = new Scanner(System.in);
        String inputText = "";
        while(inputText.isEmpty()){
            System.err.print("Enter a text: ");
            inputText = scanner.nextLine();
            if(inputText.length() == 0){
                System.err.println("Text can't be empty");
            }
        }

        int inputShift = -1;
        while(inputShift < 0){
            System.err.print("Enter a number: ");
            inputShift = scanner.nextInt();
            if(inputShift < 0){
                System.err.println("Please enter a number greater than or equal to 0");
            }
        }
        scanner.close();
        shiftText.shiftText(inputText, inputShift);
    }

    public void shiftText(String text, int shift){
        for (int i = 0; i < text.length(); i++) {
            System.out.print(shift(text.charAt(i), shift));
        }
        System.err.print("\n");
    }

    public char shift(char c, int shift){
        int ascii = (int)c;
        if((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)){
            return (char)(ascii + shift);
        }else{
            return c;
        }
    }
}
