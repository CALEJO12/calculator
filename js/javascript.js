let currentNumber = '';
let previousNumber = '';
let operator = '';

const currentDisplayNumber = document.querySelector('[data-type="current-number"]');
const previousDisplayNumber = document.querySelector('[data-type="previous-number"]');

window.addEventListener('keydown', handleKeyPress)

const equalButton = document.querySelector('[data-type="equal"]');
equalButton.addEventListener('click', () => {
    if (currentNumber != "" && previousNumber != "") {
        calculate();
    }
})

const decimalButton = document.querySelector('[data-type="decimal"]');
decimalButton.addEventListener('click', addDecimal)

const clearButton = document.querySelector('[data-type="clear"]');
clearButton.addEventListener('click', clearCalculator);
const numberButton = document.querySelectorAll('[data-type="number"]');
const operatorButton = document.querySelectorAll('[data-type="operator"]');

numberButton.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if (previousNumber !== "" && currentNumber !== "" && operator === "") {
        previousNumber = "";
        currentDisplayNumber.textContent = currentNumber;
    }
    if (currentNumber.length <= 11) {
        currentNumber += number
        currentDisplayNumber.textContent = currentNumber
    }
}

operatorButton.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
   if (previousNumber === "") {
    previousNumber = currentNumber;
    operatorCheck(op);
   } else if (currentNumber === "") {
    operatorCheck(op);
   } else {
       calculate()
       operator = op;
       currentDisplayNumber.textContent = "0";
       previousDisplayNumber.textContent = previousNumber + " " + operator;
   }
}


function operatorCheck(text) {
    operator = text;
    previousDisplayNumber.textContent = previousNumber + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNumber = "";
}


function calculate() {
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);

    if(operator === "+") {
        previousNumber = currentNumber + previousNumber
    } else if (operator === "-") {
        previousNumber = currentNumber - previousNumber
    } else if (operator === "*") {
        previousNumber = currentNumber * previousNumber
    } else if (operator === "/") {
        if (currentNumber <= 0) {
            previousNumber = "Error";
            previousDisplayNumber.textContent = "";
            currentDisplayNumber.textContent = previousNumber;
            operator = "";
            return;
        } 
        previousNumber = previousNumber/currentNumber
    }
    previousNumber = previousNumber.toString();
    displayResults();
}

function roundNumber(number) {
    return Math.round(number * 100000) / 100000;
}

function displayResults() {
    
    if (previousNumber.length <= 11) {
        currentDisplayNumber.textContent = previousNumber;
    } else {
        currentDisplayNumber.textContent = previousNumber.slice(0, 11) + "...";
    }
    previousDisplayNumber.textContent = ""
    operator = "";
    currentNumber = "";

}

function clearCalculator() {
    currentNumber = "";
    previousNumber = "";
    operator = "";
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = "";
}

function addDecimal() {
    if(!currentNumber.includes(".")) {
        currentNumber += ".";
        currentDisplayNumber.textContent = currentNumber;
    } 
}

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9){
        handleNumber(e.key);
    }
    if (e.key === "Enter" || (e.key === "=" && currentNumber != "" && previousNumber != "")) {
        calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        handleOperator(e.key);
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
}

function handleDelete() {
    if (currentNumber != "") {
        currentNumber = currentNumber.slice(0, -1);
        currentDisplayNumber.textContent = currentNumber;
        if (currentNumber === "") {
            currentDisplayNumber.textContent = "0";
        }
    }
    if (currentNumber === "" && previousNumber !== "" && operator === "") {
        previousNumber = previousNumber.slice(0, -1);
        currentDisplayNumber.textContent = previousNumber;
    }
}