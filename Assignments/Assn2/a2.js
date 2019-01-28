var monthlyExpense = 0;
var monthlyIncome = 0;

function formatDollarAmount(amount) {
    let num = "$" + amount.toFixed(2);
    return num;
}

function addListItem(listId, item) {
    let output = "<li>" + item + "</li>";
    document.getElementById(listId).innerHTML += output;
    document.getElementById("incTotal").innerHTML = income;
}

function updateTotals() {
    document.getElementById("expTotal").innerHTML = formatDollarAmount(monthlyExpense);
    document.getElementById("incTotal").innerHTML = formatDollarAmount(monthlyIncome);
    document.getElementById("total").innerHTML = formatDollarAmount(monthlyIncome-monthlyExpense);
}

function addExpense() {
    let item = prompt("Enter item:");
    let expense = prompt("Enter money spent:");
    expense = Number(expense);
    monthlyExpense += expense;
    let expenseItem = formatDollarAmount(expense) + ": " + item;
    addListItem("expenses",expenseItem);
    updateTotals();
}

function addIncome(){
    let item = prompt("Enter item:");
    let income = prompt("Enter money gained:");
    income = Number(income);
    let incomeItem = formatDollarAmount(income) + ": " + item;
    monthlyIncome += income;
    addListItem("income",incomeItem);
    updateTotals();
}

function monthlyPayment(L,p,N) {
    let monthPay = (((p/1200) * (Math.pow((1+(p/1200)),N))) / ((Math.pow((1+(p/1200)),N))-1)) * L;
    return monthPay;
}

function takeALoan() {
    let loanAmount = prompt("Enter loan amount:");
    loanAmount = Number(loanAmount);
    let interestRate = prompt("Enter interest rate:");
    interestRate = Number(interestRate);
    let numOfMonths = prompt("Enter number of months to pay back loan:");
    numOfMonths = Number(numOfMonths);
    document.getElementById("loan").innerHTML = "You borrowed " + formatDollarAmount(loanAmount) + " at " + interestRate + "% and are paying it back over " + numOfMonths + " months. Your monthly payment is " + formatDollarAmount(monthlyPayment(loanAmount,interestRate,numOfMonths)); 
}