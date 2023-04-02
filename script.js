//Basic calculator functions
function add(a,b){
    return a+b;
}
function substract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return b!=0 ? a/b : "Cannot divide by zero"; 
}
function operate(func, a, b){
    return func=="add" ? add(Number(a), Number(b)) :
            func == "substract" ? substract(Number(a), Number(b)) :
            func == "multiply" ? multiply(Number(a), Number(b)) :
            func == "divide" ? divide(Number(a), Number(b)):
            undefined;
}
//Initialize calculator variables
let screenValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

//Display function
function display(){
    let screen = document.querySelector('.screen');
    screen.innerText = rounding(String(screenValue));
}
display();

//Handle digit input
const digits = document.querySelectorAll('.digit');
digits.forEach(digit => digit.addEventListener('click', updateDisplay));

function updateDisplay(e){
    let digit = e.target.value;
        if(firstOperator===null){
            if(screenValue ==='0'|| screenValue === 0){
                screenValue = digit;
            }else if(screenValue === firstOperand){
                screenValue = digit;
            }else{
                screenValue += digit;
            }
        }else{
            if (screenValue === firstOperand){
                screenValue = digit;
            }else{
                screenValue += digit;
            }
                
        }
        display();
}

//Handle operator input
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click',inputOperator));

function inputOperator(e){
    let operator = e.target.value;
    // console.log(typeof operator);
    if(firstOperator != null && secondOperator === null){
        secondOperator = operator;
        secondOperand = screenValue;
        // console.log(`${firstOperator}(${firstOperand}, ${secondOperand})`);
        result = operate(firstOperator, firstOperand, secondOperand);
        screenValue = result;
        firstOperand = screenValue;
        result = null;
    }else if(firstOperator != null && secondOperator != null){
        secondOperand = screenValue;
        // firstOperator = secondOperator;
        result = operate(secondOperator , firstOperand, secondOperand);
        firstOperator = secondOperator;
        secondOperator = operator;
        screenValue = result;
        firstOperand = screenValue;
        result = null;
    }else{
        firstOperator = operator;
        firstOperand = screenValue;
        secondOperator = null;
    }
    display();
}

//Handle equal sign
const equals = document.querySelector('.equals');
equals.addEventListener('click',()=>{
    if (firstOperator != null  && secondOperator === null) {
        secondOperand = screenValue;
        result = operate(firstOperator , firstOperand, secondOperand);
        screenValue = result;
        // secondOperator = firstOperator;
        firstOperator = null;
        // secondOperand = null;
        // firstOperand = screenValue;
        result = null;
        display();
    }else if(firstOperator != null && secondOperator != null){
        secondOperand = screenValue;
        // secondOperator = firstOperator;
        result = operate(secondOperator , firstOperand, secondOperand);
        screenValue = result;
        // firstOperator = null;
        // secondOperator = firstOperator;
        firstOperator = null;
        display();
        result = null;
    }
})

//Handle the sign
const sign = document.querySelector('.sign');
sign.addEventListener('click',()=>{
    screenValue = String(-Number(screenValue));
    display();
})

//Handle the point
const point = document.querySelector('.point');
point.addEventListener('click',()=>{
    if(!screenValue.includes('.')){
        screenValue += '.';
        display();
    }
})

//Handle the Clear button
const clear = document.querySelector('.clear');
clear.addEventListener('click',()=>{
    screenValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
display();
})

//Handle the backspace button
const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', () =>{
     if(Number(screenValue) != 0){
        screenValue = screenValue.slice(0,-1);
        if(screenValue.length==0 || screenValue=="-"){
            screenValue = '0';
        }
        display();
    }
})

//Add Keyboard support
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});

//Handle large numbers
function rounding(str){
if(str.length > 9){
    let str2 = Number(str).toExponential();//Convert to exponential
    let str3 = String(str2);// Convert back to string
    let str4 = str3.slice(0, 4);//Extract the first four characters
    let str5 = str3.slice(-3, str3.length);//Extract the last four digits characters
    let finalString = str4 + str5; //Concatenate the last two extracted strings
    return finalString;
}
else return str;
}
