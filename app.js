const displayNum = document.querySelector('h1')
const buttons = document.querySelectorAll('.controls button')
const NumberBtns = document.querySelectorAll('.number')
const display = document.querySelector('.display')

//-------------------------------------------------------------
//setting values for value based buttons
//setting number btns value to their number
NumberBtns.forEach(number => {
    number.value = number.innerHTML
})
//setting pi button value to pi
document.querySelector('#pi').value = Math.PI
//setting decimal button value to '.'
document.querySelector('#decimal').value = '.'
//------------------------------------------------------------
let numbersArray = []; //lets us do some of the calculations
let z = '';      //the number that gets calculated and passed around (ho)
let operator;    //lets us know which operator is in use
let filter = ''; //can only click once on the same button, so it dont break
let toggle = false; //lets me reuse the result value for some of the buttons
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.id === 'clear') {
            clear();
        } else if (e.target.id === 'addition') {
            calc('addition');
        } else if (e.target.id === 'subtraction') {
            calc('subtraction');
        } else if (e.target.id === 'multiplication') {
            calc('multiplication');
        } else if (e.target.id === 'division') {
            calc('division');
        } else if (e.target.id === 'percent') {
            calc('percent');
        } else if (e.target.id === 'togglePosNeg') {
            calc('togglePosNeg');
        } else if (e.target.id === 'sqrt') {
            calc('sqrt');
        } else if (e.target.id === 'squared') {
            calc('squared');
        } else if (e.target.id === 'cubed') {
            calc('cubed');
        } else if (e.target.id === 'exponent') {
            calc('exponent');
        } else if (e.target.id === 'equal') {
            if (operator !== 'equal' && operator !== undefined) {
                z = equal();
                numbersArray = [];
            }
            toggle = true;
            if (filter !== '.') {
                displayNum.textContent = z;
                filter = '.'
            }
        } else if (e.target.id === 'pi') {
            if (z === '') {
                if (filter !== '.') {
                    numbers(e.target.value)
                    filter = '.';
                }
            } else {
                z = e.target.value;
                displayNum.textContent = e.target.value
            }

        } else {
            if (toggle) {
                z = '';
                toggle = false;
            }
            numbers(e.target.value)


        }
    })
})


document.querySelector('.controls').addEventListener('click', () => {
    if (displayNum.textContent.length > 21) {
        displayNum.textContent = Number(displayNum.textContent).toExponential()
    }
})



let excluded = ['percent', 'togglePosNeg', 'squared', 'sqrt', 'cubed']
const isPresent = (element) => element === operator;
function equal() {
    if (excluded.includes(operator)) {
        return z;
    } else {
        return findResult()

    }
}
function numbers(number) { //This will display our numbers when we click the numerical buttons
    z = z + number
    displayNum.textContent = z
}


function findResult() {
    if (operator === 'addition') {
        numbersArray.push(Number(z));
        return numbersArray.reduce((x, y) => x + y);
    } else if (operator === 'subtraction') {
        numbersArray.push(Number(z));
        return numbersArray.reduce((x, y) => x - y);
    } else if (operator === 'multiplication') {
        numbersArray.push(Number(z));
        return numbersArray.reduce((x, y) => x * y);
    } else if (operator === 'division') {
        numbersArray.push(Number(z));
        return numbersArray.reduce((x, y) => x / y);
    } else if (operator === 'percent') {
        let num = Number(z);
        z = num * 0.01;
        return z;
    } else if (operator === 'togglePosNeg') {
        let num = Number(z);
        if (num >= 0) {
            let twice = num * 2;
            z = num - twice
            return z;
        } else if (num < 0) {
            return z = Math.abs(num);
        }
    } else if (operator === 'pi') {
        numbersArray.push(Number(z));
        return numbersArray.reduce((x, y) => x * y);
    } else if (operator === 'sqrt') {
        z = Math.sqrt(z)
        return z;
    } else if (operator === 'squared') {
        let num = Number(z);
        z = Math.pow(num, 2)
        return z;
    } else if (operator === 'cubed') {
        let num = Number(z);
        z = Math.pow(num, 3)
        return z;
    } else if (operator === 'exponent') {
        numbersArray.push(Number(z));
        return numbersArray.reduce((x, y) => Math.pow(x, y));
    } else if (operator === 'equal') {
        return z;
    }
}

let excludedToggle = ['addition', 'subtraction', 'multiplication', 'division', 'percent', 'togglePosNeg'];
let excludedUpdate = ['togglePosNeg', 'sqrt', 'squared', 'cubed', 'exponent'];
function calc(name) { //function that solves for most of our buttons
    if (z !== '') {
        if (operator !== name && operator !== undefined) {
            z = equal();
            numbersArray = [];
        }
        if (!excludedToggle.includes(name)) {
            toggle = true;
        }
        operator = name
        displayNum.textContent = findResult(operator);
        if (!excludedUpdate.includes(name)) {
            update();
        }
    }
}

function clear() { //clears calculator
    displayNum.textContent = '0';
    z = '';
    numbersArray = []
    filter = '';
}
function update() { //updates z and filter
    z = ''
    filter = '';
}

