"use strict";

function checkGroups(){
    let numArray = [1,1,3,5,5,5,6,2,2];
    let group = 0;
    let num = 1;
    let bigGroup = 0;
    let bigNum = 0;
    for(let i = 0; i < numArray.length-1; i++){
        if(numArray[i] == numArray[i+1]){ 
            group = numArray[i];
            num += 1;
        }else{
            group = numArray[i];
        }
        if(num >= bigNum){
            bigGroup = group;
            bigNum = num;
            num = 0;
            group = 0;
        }
    }
    document.getElementById("para").innerHTML = "The largest grouping is " + bigGroup;
}