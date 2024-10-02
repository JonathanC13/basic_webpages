"use strict";

/**
 * Precedence of the symbol
 * @param {String} symbol character in the string
 * @return {number} To represent it's precedence order.
 */
function precedence(symbol) {
    if (['(', ')', '#'].includes(symbol)) {
        return 1;
    } else if (['+', '-'].includes(symbol)) {
        return 2;
    } else if (['x', '/'].includes(symbol)) {
        return 3;
    } else if (symbol == "^") {
        return 4;
    } else {
        return 0;
    }
}

/**
 * Determine if the symbol is an operator
 * @param {String} symbol character in the string
 * @return {boolean}
 */
function isOperator(symbol) {
    return ['+', '-', 'x', '/', '^', '(', ')'].includes(symbol);
}

/**
 * Convert infix expression string to Postfix (Reverse Polish Notation)
 * @param {String} expression The Infix expression
 * @return {String} Postfix expression
 */
function convertInfixToRPN(expression) {
    const stack = [];

    let RPN = "";
    stack.push("#");

    for (let i = 0; i < expression.length; i ++) {
        const symbol = expression[i];
        if (!isOperator(symbol)) {
            RPN = RPN.concat(symbol);
        } else {
            if (symbol == "(") {
                stack.push(symbol);
            } else {
                if (symbol == ")") {
                    while (stack[stack.length - 1] != "(") {
                        RPN = RPN.concat(stack.pop());
                    }
                    stack.pop();
                } else {
                    if (precedence(symbol) > precedence(stack[stack.length - 1])) {
                        stack.push(symbol);
                    } else {
                        while (precedence(symbol) <= precedence(stack[stack.length - 1])) {
                            RPN = RPN.concat(stack.pop());
                        }
                        stack.push(symbol);
                    }
                }
            }
        }
    }
    while (stack[stack.length - 1] != "#") {
        RPN = RPN.concat(stack.pop());
    }
    return RPN;
}

/**
 * Determine if char is a digit or decimal
 * @param {String} postfix
 * @return {String}
 */
function isDigitOrDecimal(symbol) {
    return (symbol.charCodeAt(0) >= "0".charCodeAt(0) && symbol.charCodeAt(0) <= "9".charCodeAt(0) || symbol.charCodeAt(0) == ".".charCodeAt(0));
}

/**
 * Evaluate the Postfix expression for the result
 * @param {String} postfix
 * @return {String}
 */
function evaluateRPN(postfix) {
    const stack_res = [];
    let max_len = 0;
    let i = 0
    while (i < postfix.length) {
        if (isDigitOrDecimal(postfix[i])) {
            let num = "";
            while (i < postfix.length && isDigitOrDecimal(postfix[i]) && postfix[i] != " ") {
                num = num.concat(postfix[i]);
                i ++;
            }
            stack_res.push(Number.parseFloat(num).toFixed(num.length - 1));
        } else if (postfix[i] == " ") {
            i ++;
        } else {
            const operand2 = stack_res.pop();
            const operand1 = stack_res.pop();
            max_len = Math.max(max_len, operand2);
            max_len = Math.max(max_len, operand1);

            if (postfix[i] == "+") {
                stack_res.push(operand1 + operand2);
            } else if (postfix[i] == "-") {
                stack_res.push(operand1 - operand2);
            } else if (postfix[i] == "x") {
                stack_res.push(operand1 * operand2);
            } else if (postfix[i] == "/") {
                if (Number.parseInt(operand2) == 0) {
                    return "Cannot divide by 0";
                } else {
                    stack_res.push(operand1 / operand2);
                }
            }
            i ++;
        }
    }
    return stack_res[0].toFixed(max_len - 1);
}

/**
 * Initialize application
 * @param {}
 * @return {}
 */
function initApp() {
    const taInput = document.querySelector("#ta_input");
    const divEntry = document.querySelector("#div_entry");
    const taResult = document.querySelector("#ta_result");

    taInput.value = "";
    divEntry.textContent = "0";
    taResult.value = "";

    const buttonClear = document.querySelector("#button_clear");
    buttonClear.addEventListener("click", (event) => {
        event.preventDefault();

        taInput.value = "";
        divEntry.textContent = "0";
    }, false);

    const buttonClearEntry = document.querySelector("#button_clear_entry");
    buttonClearEntry.addEventListener("click", (event) => {
        event.preventDefault();

        divEntry.textContent = "0";
    }, false);

    const buttonBackSpace = document.querySelector("#button_backspace");
    buttonBackSpace.addEventListener("click", (event) => {
        event.preventDefault();

        if (divEntry.textContent.length > 0) {
            divEntry.textContent = divEntry.textContent.slice(0, divEntry.textContent.length - 1);
        }

        if (divEntry.textContent.length == 0) {
            divEntry.textContent = "0"
        }
    }, false);

    const operands = document.querySelectorAll(".operand");
    for (let i = 0; i < operands.length; i++) {
        operands[i].addEventListener("click", (event) => {
            event.preventDefault();

            if (divEntry.textContent === "0") {
                divEntry.textContent = event.target.innerHTML;
            } else {
                divEntry.textContent = divEntry.textContent.concat(event.target.innerHTML);
            }
            
        }, false);
    }

    const signed = document.querySelector(".signed");
    signed.addEventListener("click", (event) => {
        event.preventDefault();

        let entry = divEntry.textContent;
        if (entry.length > 0 && entry != "0") {
            if (entry.charAt(0) == "-") {
                divEntry.textContent = entry.slice(1, entry.length);
            } else {
                divEntry.textContent = "-".concat(entry.slice(0, entry.length));
            }
        }
    }, false);

    const decimal = document.querySelector(".decimal");
    decimal.addEventListener("click", (event) => {
        event.preventDefault();

        if (divEntry.textContent.indexOf(event.target.innerHTML) == -1) {
            divEntry.textContent = divEntry.textContent.concat(event.target.innerHTML);
        }
    }, false);
    
    const operators = document.querySelectorAll(".operator");
    for (let i = 0; i < operators.length; i ++) {
        operators[i].addEventListener("click", (event) => {
            event.preventDefault();
            
            taInput.value = taInput.value.concat(divEntry.textContent.concat(" ", event.target.innerHTML)) + " ";

            divEntry.textContent = 0;
        }, false);
    }

    const evaluate = document.querySelector(".evaluate");
    evaluate.addEventListener("click", (event) => {
        event.preventDefault();

        const regex = /\s{2,}/g;

        const exp = (taInput.value + divEntry.textContent).trim();
        
        const RPN = convertInfixToRPN(exp.replace(regex, " "));

        const result = evaluateRPN(RPN.replace(regex, " "));

        taResult.value = exp + " = " + "\r\n" + result;
    }, false);
}
// TODO: negative numbers **
/**
 * Listener for readystatechange states.
 * @param {}
 * @return {}
 */
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});