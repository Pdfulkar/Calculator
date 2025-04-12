class Calculator {
    constructor() {
        this.previousOperandElement = document.getElementById('previousOperand');
        this.currentOperandElement = document.getElementById('currentOperand');
        this.clear();
        this.setupEventListeners();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero');
                    this.clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.textContent = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    setupEventListeners() {
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.textContent);
                this.updateDisplay();
            });
        });

        document.querySelectorAll('[data-operation]').forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.textContent);
                this.updateDisplay();
            });
        });

        document.querySelector('[data-action="calculate"]').addEventListener('click', () => {
            this.compute();
            this.updateDisplay();
        });

        document.querySelector('[data-action="clear"]').addEventListener('click', () => {
            this.clear();
            this.updateDisplay();
        });

        document.querySelector('[data-action="delete"]').addEventListener('click', () => {
            this.delete();
            this.updateDisplay();
        });
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});