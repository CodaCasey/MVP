//practice file for seeding and testing data
// we want to model each node to look like this in a linked list
let container = [

  {english:'hello', spanish: 'hola', num:3},
  {english:'dog', spanish: 'perro', num:2},
  {english:'but', spanish: 'pero', num:1},
  {english:'goodbye', spanish: 'adios', num:4},
  {english:'thank you', spanish: 'gracias', num:4},

]
// i dont think I need to define the nodes properties here if i sort by word number in database
// i migth hold this off because implentation and trying to figure this out is taking a while i may use an array and see if i cna implement that first.

// type SuperMemoItem = {
//   interval: number;
//   repetition: number;
//   efactor: number;
// };

// type SuperMemoGrade = 0 | 1 | 2 | 3 | 4 | 5;

// supermemo(item: SuperMemoItem, grade: SuperMemoGrade): SuperMemoItem
// let item: SuperMemoItem = {
//   interval: 0,
//   repetition: 0,
//   efactor: 2.5,
// };

// console.log(item);

// item = supermemo(item, 5);
// console.log(item);

// item = supermemo(item, 4);
// console.log(item);



class Node {
  constructor(value)
  node.value=value;
  node.next=null;

}

class Linked {
  constructor(){
    this.head = null;
    this.size = 0;
  }

  addLink(){
    let node = new Node(value)
    let current;
    if(this.head ===null){
      this.head = node
    }else{
      current = this.head;
      while(current.next){
        current = current.next
      }
      current.next = node;
    }
    this.size++
  }

  insert(value,index){
    if (index > 0 && index > this.size)
        return false;
    else {
        var node = new Node(value);
        let current;
        let previous;

        current = this.head;

        if (index == 0) {
            node.next = this.head;
            this.head = node;
        } else {
            current = this.head;
            let i = 0;

            while (i < index) {
                i += 1;
                previous = current;
                current = current.next;
            }

            node.next = current;
            previous.next = node;
        }
        this.size++;
    }
  }

  remove(index){
    if (index > 0 && index > this.size)
        return -1;
    else {
        let current;
        let previous;
        let i = 0;
        current = this.head;
        previous = current;
        if (index === 0) {
            this.head = current.next;
        } else {
            while (i < index) {
                i += 1;
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.size -= 1;
        return current.element;
    }
  }



}