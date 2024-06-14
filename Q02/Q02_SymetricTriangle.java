import java.util.Scanner;


public class Q02_SymetricTriangle {
    public static void main(String[] args) {
        Q02_SymetricTriangle symetricTriangle = new Q02_SymetricTriangle();
        Scanner scanner = new Scanner(System.in);
        int input = 0;
        while(input <= 0){
            System.err.print("Enter a number: ");
            input = scanner.nextInt();
            if(input <= 0){
                System.err.println("Please enter a number greater than 0");
            }
        }
        scanner.close();
        symetricTriangle.printSymetricTriangle(input);
    }

    public void printSymetricTriangle(int num){
        printReverseTriangle(num);
        printTriangle(num);
    }

    public void printReverseTriangle(int num){
        for (int i = 0; i < num; i++) {
            printLine(i, num);
        }
    }

    public void printTriangle(int num){
        for (int i = num - 1; i >= 0; i--) {
            printLine(i, num);
        }
    }

    public void printLine(int prefix, int content){
        for (int i = 0; i < prefix; i++) {
            System.out.print(" ");
        }
        for (int i = 0; i < content - prefix; i++) {
            System.out.print("* ");
        }
        for (int i = 0; i < prefix; i++) {
            System.out.print(" ");
        }
        System.err.print("\n");
    }
}
