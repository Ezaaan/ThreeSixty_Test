
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class LinkedList {
    private Node head;

    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        Scanner scanner = new Scanner(System.in);
        int len = 0;
        System.err.print("Enter array length: ");
        len = scanner.nextInt();
        int[] inputArr = new int[len];
        for(int i = 0; i < len; i++){
            inputArr[i] = scanner.nextInt();
        }
        scanner.close();
        list.generateLinkedList(inputArr);
        if(list.isCyclic()){
            System.out.println("Linked List is cyclic");
        }else{
            System.out.println("Linked List is not cyclic");
        }
        list.displayList();
    }

    public LinkedList() {
        this.head = null;
    }

    private  boolean isCyclic(){
        List<Integer> iterated = new ArrayList<>();
        Node current = this.head;
        while(current != null){
            if(iterated.contains(current.nodeId)){
                return true;
            }
            iterated.add(current.nodeId);
            current = current.next;
        }
        return false;
    }

    private void generateLinkedList(int[] nodes){
        Node current = null;
        for (int i = 0; i < nodes.length; i++) {
            if(this.head == null){
                this.head = new Node(nodes[i]);
                current = this.head;
            } 
            else {
                if(isNodeExist(nodes[i])){
                    linkNode(current, nodes[i]);
                    break;
                }else{
                    current.next = new Node(nodes[i]);
                    current = current.next;
                }
            }
        }
    }

    private void linkNode(Node from, int to){
        if(from == null){
            return;
        }

        Node current = head;
        while(current.nodeId != to){
            current = current.next;
        }
        from.next = current;
    }

    private boolean isNodeExist(int nodeId){
        Node current = this.head;
        while(current != null){
            if(current.nodeId == nodeId){
                return true;
            }
            current = current.next;
        }
        return false;
    }

    private void displayList() {
        Node current = head;
        List<Integer> iterated = new ArrayList<>();
        while (current != null) {
            System.out.print(current.nodeId);
            if(iterated.contains(current.nodeId)){
                break;
            }

            iterated.add(current.nodeId);
            current = current.next;

            if(current != null){
                System.err.print(" -> ");
            }
        }
        System.out.println();
    }

    

    private static class Node {
        private int nodeId;
        private Node next;

        public Node(int nodeId) {
            this.nodeId = nodeId;
            this.next = null;
        }
    }
}
