function changeOutput(id, phrase){
    document.getElementById(id).innerHTML = phrase;
}

function moneyMaker(){
    let hours = prompt("Enter the amount of hours worked:");
    hours = Number(hours);
    if(hours >= 0){
        if(hours <= 40){
            let pay = hours*12;
            changeOutput("moneymade",("In " + hours + " hours you made $" + pay + "."));
        }else{
            let sec = (hours - 40)*18;
            let first = 40*12;
            let pay = first + sec;
            changeOutput("moneymade",("In " + hours + " hours you made $" + pay + "."));
        }
    }
}

function isLeapYear(){
    let year = prompt("Enter the year:");
    year = Number(year);
    if(year < 1582){
        alert("Invalid input. Enter a year greater than 1581.")
        isLeapYear();
    }else{
        if(year%4 == 0){
            if((year%100 == 0) && (year%400 != 0)){
                changeOutput("leapyear",(year + " is not a leap year."));
            }else{
                changeOutput("leapyear",(year + " is a leap year."))
            }
        }else{
            changeOutput("leapyear",(year + " is not a leap year."));
        }
    }
}

function isItYoda(){
    let ans = prompt("Is your favorite character small?");
    ans = ans.toLowerCase();
    //checks if small
    if(ans == "yes"){
        ans = prompt("Is your favorite character green?");
        ans = ans.toLowerCase();
        //checks if green
        if(ans == "yes"){
            ans = prompt("Does your favorite character use poor grammar?");
            ans = ans.toLowerCase();
            //checks if has poor grammar
            if(ans == "yes"){
                changeOutput("favchar", "Your favorite character is small, green, and uses poor grammar. Your favorite character is Yoda!");
            }else{
                changeOutput("favchar", "Your favorite character is small, green, but does not use poor grammar. Your favorite character is Kermit!");
            }
        }else{
            //if character is small but not green
            ans = prompt("Does your favorite character use poor grammar?");
            ans = ans.toLowerCase();
            //checks if small, not green, uses poor grammar
            if(ans == "yes"){
                changeOutput("favchar", "Your favorite character is small, not green, and uses poor grammar. Your favorite character is Gary Coleman!");
            }else{
                changeOutput("favchar", "Your favorite character is small, not green, and does not use poor grammar. Your favorite character is Mini-Me!");
            }
        }
    }else{
        //if not small, checks if green
        ans = prompt("Is your favorite character green?");
        ans = ans.toLowerCase();
        //if green
        if(ans == "yes"){
            ans = prompt("Does your favorite character use poor grammar?");
            ans = ans.toLowerCase();
            //checks if not small, is green, uses poor grammar
            if(ans == "yes"){
                changeOutput("favchar", "Your favorite character is not small, is green, and uses poor grammar. Your favorite character is Hulk!");
            }else{
                changeOutput("favchar", "Your favorite character is not small, is green, and does not use poor grammar. Your favorite character is Shrek!");
            }
        }else{
            //if not small nor green
            ans = prompt("Does your favorite character use poor grammar?");
            ans = ans.toLowerCase();
            //checks if not small nor green and grammar usage
            if(ans == "yes"){
                changeOutput("favchar", "Your favorite character is not small, is not green, and uses poor grammar. Your favorite character is Jar Jar!");
            }else{
                changeOutput("favchar", "Your favorite character isn't small, green, nor do they use poor grammar. They must be exceedingly boring.");
            }
        }
    }
    
}