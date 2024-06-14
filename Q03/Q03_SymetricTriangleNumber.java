import java.util.Scanner;

public class Q03_SymetricTriangleNumber {
    public static void main(String[] args) {
        Q03_SymetricTriangleNumber symetricTriangle = new Q03_SymetricTriangleNumber();
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
        symetricTriangle.printSymetricTriangleNumber(input);
    }

    public void printSymetricTriangleNumber(int num){
        for (int i = 0; i < num; i++) {
            printLine(i+1, num);
        }
        for (int i = num; i > 0; i--) {
            printLine(i-1, num);
        }
    }

    public void printLine(int id, int num){
        for (int i = 0; i < num; i++) {
            if(i < id){
                System.out.print(i+1);
            } else {
                System.out.print(" ");
            }
        }
        for (int i = num-1; i > 0; i--) {
            if(i <= id){
                System.out.print(i);
            } else {
                System.out.print(" ");
            }
        }
        System.err.print("\n");
    }
}
