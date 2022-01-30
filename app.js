const btn = document.querySelector(".calculator-btn");
const calculator = {
  displayValue: "0",
  firstOperand: null,
  secondOperand: false,
  operator: null,
};

// update display
const updateDisplay = () => {
  const output = document.querySelector(".output");
  const { displayValue } = calculator;
  output.value = displayValue;
};

btn.addEventListener("click", (e) => {
  // to return if clicked outside and not button
  if (!e.target.matches("button")) {
    return;
  }

  // operator
  if (e.target.classList.contains("operator")) {
    handleOperator(e.target.value);
    updateDisplay();
    return;
  }

  // reset
  if (e.target.classList.contains("clear")) {
    reset(e.target.value);
    updateDisplay();
    return;
  }

  // decimal
  if (e.target.classList.contains("decimal")) {
    inputDecimal(e.target.value);
    return;
  }
  // digits
  inputDigit(e.target.value);
  updateDisplay();
  console.log(calculator);
});

// insert digit
function inputDigit(digit) {
  const { displayValue, secondOperand } = calculator;

  if (secondOperand === true) {
    calculator.displayValue = digit;
    calculator.secondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

// input decimal
function inputDecimal(decimal) {
  const { displayValue } = calculator;
  if (!calculator.displayValue.includes(decimal)) {
    calculator.displayValue += decimal;
  }
}

// handle + - x etc
function handleOperator(nextOperator) {
  const { displayValue, firstOperand, operator } = calculator;

  const value = parseFloat(displayValue);

  // to override earlier selected operator
  if (operator && calculator.secondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(value)) {
    calculator.firstOperand = value;
  } else if (operator) {
    const result = calculate(firstOperand, value, operator);
    // calculator.displayValue = String(result);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }
  calculator.secondOperand = true;
  calculator.operator = nextOperator;
}

// calculation
function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

// reset the calculator
function reset(clear) {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.secondOperand = false;
  calculator.operator = null;
}
