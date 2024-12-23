class Calculator {
    constructor() {
        this.expression = '';
        this.displayElement = document.getElementById('display');
    }

    addToDisplay(value) {
        this.expression += value;
        this.displayElement.value = this.expression;
    }

    backspace() {
        this.expression = this.expression.slice(0, -1);
        this.displayElement.value = this.expression;
    }

    evaluateExpression() {
        try {
            const result = this.calculate(this.expression);
            this.displayElement.value = result;
            this.expression = result.toString();
        } catch (error) {
            this.displayElement.value = 'Error';
            this.expression = '';
        }
    }

    calculate(expression) {
        let tokens = this.tokenize(expression);
        return this.evaluateTokens(tokens);
    }

    tokenize(expression) {
        const regex = /(\d+\.?\d*|π|E|sin|cos|tan|asin|acos|atan|sqrt|log10|mod|inv|ln|\^|[\+\-\*\/\(\)])/g;
        return expression.match(regex) || [];
    }

    evaluateTokens(tokens) {
        const operatorStack = [];
        const valueStack = [];
        const functionQueue = [];
        const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, 'mod': 2, '^': 3 };
    
        const operators = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
            'mod': (a, b) => a % b,
            '^': (a, b) => Math.pow(a, b),
        };
    
        const functions = {
            'sin': (value) => Math.sin(value * Math.PI / 180),
            'cos': (value) => Math.cos(value * Math.PI / 180),
            'tan': (value) => Math.tan(value * Math.PI / 180),
            'asin': (value) => Math.asin(value) * 180 / Math.PI,
            'acos': (value) => Math.acos(value) * 180 / Math.PI,
            'atan': (value) => Math.atan(value) * 180 / Math.PI,
            'sqrt': (value) => Math.sqrt(value),
            'log10': (value) => Math.log10(value),
            'π': () => Math.PI,
            'E': () => Math.E,
            'inv': (value) => 1 / value,
            'ln': (value) => Math.log(value),
        };
        for (const token of tokens) {
            if (!isNaN(token)) {
                valueStack.push(parseFloat(token));
            } else if (token in operators) {
                this.handleOperator(token, operatorStack, valueStack, operators, precedence);
            } else if (token === '(') {
                operatorStack.push(token);
            } else if (token === ')') {
                this.handleParenthesis(operatorStack, valueStack, operators);
                this.processFunctions(functionQueue, valueStack, functions); 
            } else {
                functionQueue.push(token);
            }
        }
    
        this.finalizeEvaluation(operatorStack, valueStack, operators);
        return valueStack.pop();
    }

    handleOperator(token, operatorStack, valueStack, operators, precedence) {
        while (operatorStack.length > 0 && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
            const op = operatorStack.pop();
            const b = valueStack.pop();
            const a = valueStack.pop();
            valueStack.push(operators[op](a, b));
        }
        operatorStack.push(token);
    }

    handleParenthesis(operatorStack, valueStack, operators) {
        while (operatorStack[operatorStack.length - 1] !== '(') {
            const op = operatorStack.pop();
            const b = valueStack.pop();
            const a = valueStack.pop();
            valueStack.push(operators[op](a, b));
        }
        operatorStack.pop(); 
    }

    processFunctions(functionQueue, valueStack, functions) {
        while (functionQueue.length > 0 && valueStack.length > 0) {
            const func = functionQueue.shift();
            const value = valueStack.pop();
            if (functions[func]) {
                valueStack.push(functions[func](value));
            }
        }
    }

    finalizeEvaluation(operatorStack, valueStack, operators) {
        while (operatorStack.length > 0) {
            const op = operatorStack.pop();
            const b = valueStack.pop();
            const a = valueStack.pop();
            valueStack.push(operators[op](a, b));
        }
    }

    clearAll() {
        this.expression = '';
        this.displayElement.value = '';
    }
}

const calc = new Calculator();