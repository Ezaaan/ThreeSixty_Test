import java.util.Scanner;

public class RecursiveReverse {
    public static void main(String[] args) {
        RecursiveReverse recursiveReverse = new RecursiveReverse();
        Scanner scanner = new Scanner(System.in);
        String input = "";
        while(input.isEmpty()){
            System.err.print("Enter a text: ");
            input = scanner.nextLine();
            if(input.length() == 0){
                System.err.println("Text can't be empty");
            }
        }
        scanner.close();
        recursiveReverse.printReverse(input);
    }

    public void printReverse(String input){
        if(input.length() > 0){
            System.out.print(input.charAt(input.length() - 1));
            printReverse(input.substring(0, input.length() - 1));
        }
    }
}
