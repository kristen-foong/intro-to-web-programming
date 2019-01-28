"use strict";

function acronym() {
    let phrase = prompt("Enter a phrase: ");
    phrase = phrase.toUpperCase();
    let string = "";
    string += phrase.charAt(0);
    for(let i = 0; i < phrase.length; i++){
        if((phrase.charAt(i-1)) == " "){
            string += phrase.charAt(i);
        }
    }
    document.getElementById("acronyms").innerHTML = string;
}

function makeStars(){
    document.getElementById("stars").innerHTML = "";
    let num = prompt("Enter an odd number:");
    num = Number(num);
    while(num%2 != 1){
        num = prompt("Invalid input. Enter an odd number:");
    }
    for(let row = 0; row < num; row++){
        for(let col = 0; col < num; col++){
            if((Math.floor(num/2)) == row || (Math.floor(num/2)) == col){
                document.getElementById("stars").innerHTML += "*";
            }else{
                document.getElementById("stars").innerHTML += "&nbsp;&nbsp;";
            }
        }
        document.getElementById("stars").innerHTML += "<br>";
    }
}