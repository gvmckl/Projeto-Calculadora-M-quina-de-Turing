function addSymbol(symbol) {
    const inputField = document.getElementById('input');
    inputField.value += symbol;
}

function addSpace() {
    const inputField = document.getElementById('input');
    inputField.value += ' ';
}

function backspace() {
    const inputField = document.getElementById('input');
    inputField.value = inputField.value.slice(0, -1);
}

function clearInput() {
    const inputField = document.getElementById('input');
    inputField.value = '';
    
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 
}

function turingMachine(operations) {
    const validOperators = ['+', '-', '*', '/', '%'];

    let state = 'start';
    let result = [];
    let currentNumber = 0;
    let currentOperator = null;

    for (const symbol of operations) {
        switch (state) {
            case 'start':
                if (!isNaN(symbol)) {
                    currentNumber = parseInt(symbol);
                    state = 'number';
                } else {
                    throw new Error("Erro: símbolo inválido encontrado no início.");
                }
                break;
            case 'number':
                if (validOperators.includes(symbol)) {
                    currentOperator = symbol;
                    state = 'operator';
                } else {
                    throw new Error("Erro: esperava-se um operador após o número.");
                }
                break;
            case 'operator':
                if (!isNaN(symbol)) {
                    switch (currentOperator) {
                        case '+':
                            currentNumber += parseInt(symbol);
                            break;
                        case '-':
                            currentNumber -= parseInt(symbol);
                            break;
                        case '*':
                            currentNumber *= parseInt(symbol);
                            break;
                        case '/':
                            currentNumber /= parseInt(symbol);
                            break;
                        case '%':
                            currentNumber %= parseInt(symbol);
                            break;
                        default:
                            throw new Error("Erro: operador inválido.");
                    }
                    result.push(currentNumber);
                    state = 'number';
                } else {
                    throw new Error("Erro: esperava-se um número após o operador.");
                }
                break;
            default:
                throw new Error("Erro: estado inválido.");
        }
    }

    if (state !== 'number') {
        throw new Error("Erro: a entrada terminou em um estado inválido.");
    }

    return result;
}

function calculate() {
    const input = document.getElementById('input').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    try {
        const operations = input.split(' ');
        const results = turingMachine(operations);
        resultsDiv.innerHTML = `<p>Resultado: ${results.join(', ')}</p>`;
    } catch (e) {
        resultsDiv.innerHTML = `<p class="error">${e.message}</p>`;
    }
}
