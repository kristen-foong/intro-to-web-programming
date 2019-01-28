function factor(){
    let num = prompt("Enter a num:");
    let factor = 2;
    while((num % factor) != 0){
        factor++;
    }
    console.log(factor);
}

function findChar(){
    let input = prompt("Write a sentence");
    let char = prompt("Enter a char");
    let index = 0;
    let found = false;
    while(index < input.length && !found){
        if(char == input.charAt(index)){
            found = true;
        }
        index++;
    }
    if(!found){
        console.log("Char not found.");
    }
}

function evenOdd(){
    for(int i = 0; i <= 20; i++){
        if(i % 2 == 1){
            console.log( i + " is odd");
        }else if(i % 2 == 0){
            console.log(i + " is even");
        }
    }
}

function reverseString(){
    let string = prompt("Enter a string");
    let newstring = "";
    for(i = string.length - 1; i >= 0; i--){
        newstring += string.charAt(i);
    }
    console.log(newstring);
}