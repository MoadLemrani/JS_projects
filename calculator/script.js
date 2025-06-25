class Calculator {
      constructor() {
        this.display = document.getElementById("display");
        this.history = document.getElementById("history");
        this.currentInput = "";
        this.previousInput = "";
        this.operator = "";
        this.waitingForOperand = false;
        this.memory = 0;
        this.historyText = "";
        
        this.initializeEventListeners();
        this.initializeKeyboardSupport();
      }

      initializeEventListeners() {
        document.querySelectorAll("button").forEach(btn => {
          btn.addEventListener("click", (e) => this.handleButtonClick(e));
        });
      }

      initializeKeyboardSupport() {
        document.addEventListener("keydown", (e) => {
          e.preventDefault();
          this.handleKeyPress(e.key);
        });
      }

      handleKeyPress(key) {
        const keyMap = {
          '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
          '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
          '.': '.', '+': '+', '-': '-', '*': '*', '/': '/',
          'Enter': '=', '=': '=', 'Escape': 'clear', 'Backspace': 'backspace',
          'c': 'clear', 'C': 'clear'
        };

        const mappedKey = keyMap[key];
        if (mappedKey) {
          if (mappedKey >= '0' && mappedKey <= '9' || mappedKey === '.') {
            this.inputNumber(mappedKey);
          } else if (['+', '-', '*', '/'].includes(mappedKey)) {
            this.inputOperator(mappedKey);
          } else if (mappedKey === '=') {
            this.calculate();
          } else if (mappedKey === 'clear') {
            this.clear();
          } else if (mappedKey === 'backspace') {
            this.backspace();
          }
        }
      }

      handleButtonClick(e) {
        const btn = e.target;
        const num = btn.getAttribute("data-num");
        const op = btn.getAttribute("data-op");
        const id = btn.id;

        if (num !== null) {
          this.inputNumber(num);
        } else if (op) {
          this.inputOperator(op);
        } else {
          this.handleSpecialButton(id);
        }
      }

      handleSpecialButton(id) {
        switch(id) {
          case "clear":
            this.clear();
            break;
          case "equal":
            this.calculate();
            break;
          case "percent":
            this.percentage();
            break;
          case "sqrt":
            this.sqrt();
            break;
          case "square":
            this.square();
            break;
          case "memory-clear":
            this.memoryClear();
            break;
          case "memory-recall":
            this.memoryRecall();
            break;
          case "memory-add":
            this.memoryAdd();
            break;
        }
      }

      inputNumber(num) {
        if (num === "." && this.currentInput.includes(".")) {
          return;
        }

        if (this.waitingForOperand) {
          this.currentInput = num === "." ? "0." : num;
          this.waitingForOperand = false;
        } else {
          this.currentInput = this.currentInput === "0" ? (num === "." ? "0." : num) : this.currentInput + num;
        }

        this.updateDisplay();
      }

      inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === "") {
          this.previousInput = inputValue;
        } else if (this.operator) {
          const currentValue = this.previousInput || 0;
          const newValue = this.performCalculation(currentValue, inputValue, this.operator);

          this.currentInput = String(newValue);
          this.previousInput = newValue;
          this.updateDisplay();
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
        this.updateHistory();
      }

      calculate() {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput !== "" && this.operator) {
          const currentValue = this.previousInput || 0;
          const newValue = this.performCalculation(currentValue, inputValue, this.operator);

          this.historyText = `${this.previousInput} ${this.getOperatorSymbol(this.operator)} ${inputValue} =`;
          this.currentInput = String(newValue);
          this.previousInput = "";
          this.operator = "";
          this.waitingForOperand = true;
          
          this.updateDisplay();
          this.updateHistory();
        }
      }

      performCalculation(firstOperand, secondOperand, operator) {
        try {
          let result;
          switch (operator) {
            case "+":
              result = firstOperand + secondOperand;
              break;
            case "-":
              result = firstOperand - secondOperand;
              break;
            case "*":
              result = firstOperand * secondOperand;
              break;
            case "/":
              if (secondOperand === 0) {
                throw new Error("Division by zero");
              }
              result = firstOperand / secondOperand;
              break;
            default:
              return secondOperand;
          }
          
          // Round to avoid floating point precision issues
          return Math.round(result * 1000000000) / 1000000000;
        } catch (error) {
          this.showError();
          return 0;
        }
      }

      percentage() {
        const value = parseFloat(this.currentInput);
        this.currentInput = String(value / 100);
        this.updateDisplay();
      }

      sqrt() {
        const value = parseFloat(this.currentInput);
        if (value < 0) {
          this.showError();
          return;
        }
        this.currentInput = String(Math.sqrt(value));
        this.updateDisplay();
      }

      square() {
        const value = parseFloat(this.currentInput);
        this.currentInput = String(value * value);
        this.updateDisplay();
      }

      memoryClear() {
        this.memory = 0;
      }

      memoryRecall() {
        this.currentInput = String(this.memory);
        this.waitingForOperand = false;
        this.updateDisplay();
      }

      memoryAdd() {
        this.memory += parseFloat(this.currentInput) || 0;
      }

      backspace() {
        if (this.currentInput.length > 1) {
          this.currentInput = this.currentInput.slice(0, -1);
        } else {
          this.currentInput = "0";
        }
        this.updateDisplay();
      }

      clear() {
        this.currentInput = "";
        this.previousInput = "";
        this.operator = "";
        this.waitingForOperand = false;
        this.historyText = "";
        this.updateDisplay();
        this.updateHistory();
      }

      showError() {
        this.currentInput = "Error";
        this.display.classList.add("error");
        setTimeout(() => {
          this.display.classList.remove("error");
          this.clear();
        }, 1500);
        this.updateDisplay();
      }

      getOperatorSymbol(op) {
        const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
        return symbols[op] || op;
      }

      updateDisplay() {
        this.display.textContent = this.currentInput || "0";
      }

      updateHistory() {
        if (this.historyText) {
          this.history.textContent = this.historyText;
        } else if (this.previousInput && this.operator) {
          this.history.textContent = `${this.previousInput} ${this.getOperatorSymbol(this.operator)}`;
        } else {
          this.history.textContent = "";
        }
      }
    }

    // Initialize calculator when page loads
    document.addEventListener("DOMContentLoaded", () => {
      new Calculator();
    });