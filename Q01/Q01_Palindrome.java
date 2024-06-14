import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Q01_Palindrome {
    public static void main(String[] args) {
        List<Character> inputs = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        
        String input = "";
        while(!"exit".equals(input) || input.isEmpty()){
            System.err.print("Enter a character (type \"exit\" to stop): ");
            input = scanner.nextLine();
            if(input.length() == 1){
                inputs.add(input.charAt(0));
            } else if(!"exit".equals(input)){
                System.err.println("Please enter only one character");
            }
        }
        scanner.close();
        System.err.print("\nPalindrome: ");
        for (int i = 0; i < inputs.size() * 2; i++) {
            if(i < inputs.size()){
                System.out.print(inputs.get(i));
            } else {
                System.out.print(inputs.get(inputs.size() - (i - inputs.size() + 1)));
            }
        }
    }
}
