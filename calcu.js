let currentDisplay = "";
const history = [];

function insert(input) {
  if (currentDisplay.length >= 20) {
    return;
  }

  currentDisplay += input;
  document.getElementById("numerosDisplay").innerHTML = currentDisplay;
}

function clearDisplay() {
  currentDisplay = "";
  document.getElementById("numerosDisplay").innerHTML = currentDisplay;
}

function deleteDisplay() {
  currentDisplay = currentDisplay.slice(0, -1);
  document.getElementById("numerosDisplay").innerHTML = currentDisplay;
}

function addToHistory(expression, result) {
  history.push({ expression, result });

  if (history.length > 4) {
    history.shift();
  }

  displayHistory();
}

function displayHistory() {
  const historyElement = document.querySelector(".historyPage");
  historyElement.innerHTML = "";

  for (let i = history.length - 1; i >= 0; i--) {
    const entry = history[i];
    const operationDiv = document.createElement("div");
    operationDiv.textContent = `${entry.expression} = ${entry.result}`;
    historyElement.appendChild(operationDiv);
  }
}

function getResult() {
  const result = evaluateExpression(currentDisplay);
  if (!isNaN(result)) {
    document.getElementById("numerosDisplay").innerHTML = result;
    currentDisplay = result.toString();
    addToHistory(currentDisplay, result);
  } else {
    document.getElementById("numerosDisplay").innerHTML = "Erro";
  }
}

function evaluateExpression(expression) {
  const operators = ["+", "-", "x", ":"];
  const operatorStack = [];
  const numberStack = [];

  let currentNumber = "";

  for (const char of expression) {
    if (operators.includes(char)) {
      numberStack.push(parseFloat(currentNumber));
      currentNumber = "";

      while (
        operatorStack.length > 0 &&
        operators.indexOf(char) <=
          operators.indexOf(operatorStack[operatorStack.length - 1])
      ) {
        const operator = operatorStack.pop();
        const num2 = numberStack.pop();
        const num1 = numberStack.pop();
        numberStack.push(performOperation(num1, num2, operator));
      }

      operatorStack.push(char);
    } else {
      currentNumber += char;
    }
  }

  numberStack.push(parseFloat(currentNumber));

  while (operatorStack.length > 0) {
    const operator = operatorStack.pop();
    const num2 = numberStack.pop();
    const num1 = numberStack.pop();
    numberStack.push(performOperation(num1, num2, operator));
  }

  if (numberStack.length !== 1) {
    throw new Error("Expressão inválida");
  }

  return numberStack[0];
}

function performOperation(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case ":":
      if (num2 === 0) {
        throw new Error("Divisão por zero");
      }
      return num1 / num2;
    default:
      throw new Error("Operador inválido");
  }
}

function equals() {
  if (currentDisplay.trim() === "") {
    return;
  }

  getResult();

  currentDisplay = "";
}
