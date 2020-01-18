class Calculator {
    constructor(previewText, currenText) {
        this.previewText = previewText;
        this.currenText = currenText;
        this.clearAll();
    }

    clearAll() {
        this.currentOperand = '';
        this.previewOperand = '';
        this.currenOperation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        this.operation = operation;
        if (this.currentOperand === '') return;
        if (this.previewOperand !== '') {
            this.compute();
        }
        this.previewOperand = this.currentOperand
        this.operation;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previewOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(current) || isNaN(prev)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.previewOperand = '';
        this.operation = undefined;
    }
    displayNumber(number) {
        const intDigits = parseFloat(number.toString().split('.')[0]);
        const desimalDigits = number.toString().split('.')[1];
        let intDisplay;
        if (isNaN(intDigits)) {
            intDisplay = '';
        } else {
            intDisplay = intDigits.toLocaleString('en', { minimumFractionDigits: 0 });
        }
        if (desimalDigits != null) {
            return `${intDisplay}.${desimalDigits}`;
        } else { return intDisplay; }
    }

    updateDisplay() {
        if (this.operation != null) {
            this.previewText.innerText = `${this.displayNumber(this.previewOperand)} ${this.operation}`;
        } else {
            this.previewText.innerText = '';
        }
        this.currenText.innerText = this.displayNumber(this.currentOperand);
    }

}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-Clear]');
const previewText = document.querySelector('[data-preview-operand]');
const currenText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previewText, currenText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});
allClearButton.addEventListener('click', button => {
    calculator.clearAll();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});