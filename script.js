function convertExp(){
    const type = document.getElementById("expressionType").value;
    const expr = document.getElementById("inputExpr").value.trim();
    let result = "";

    if(!expr){
        document.getElementById("Result").innerText = "Please Enter A Valid Expression.";
        return;
    }

    switch(type){
        case "infixToPostfix" :
            result = infixToPostfix(expr);
            break;
        case "infixToPrefix" :
            result = infixToPrefix(expr);
            break;
        case "postfixToInfix" :
            result = postfixToInfix(expr);
            break;
        default :
            result = "Invalid Conversion Type!";
    }

    document.getElementById("Result").innerText = result;
}



// -------------------------------- CONVERSION FUNCTIONS ---------------------------------

function infixToPostfix(s){
    let stack = [];
    let ans = "";



    for(let i=0; i<s.length; i++){
        let ch = s[i];

        if(/[a-zA-Z0-9]/.test(ch)){
            ans += ch;
        }
        else if(ch==='('){
            stack.push(ch);
        }
        else if(ch===')'){
            while(stack.length && stack[stack.length-1] !== '('){
                ans += stack.pop();
            }
            stack.pop();
        }
        else{
            while(stack.length && priority(ch)<=priority(stack[stack.length-1])){
                ans += stack.pop();
            }
            stack.push(ch);
        }
    }

    while(stack.length){
        ans += stack.pop();
    }

    return ans;
}


function infixToPrefix(s){
    const rev = reverseExpression(s);
    const postfix = infixToPostfixModified(rev);
    return reverseExpression(postfix);
}
function infixToPostfixModified(s){
    let stack = [];
    let result = "";

    for(let i=0; i<s.length; i++){
        let ch = s[i];

        if(/[a-zA-Z0-9]/.test(ch)){
            result += ch;
        }
        else if(ch === '('){
            stack.push(ch);
        }
        else if(ch === ')'){
            while(stack.length && stack[stack.length-1]!=='('){
                result += stack.pop();
            }
            stack.pop();
        }
        else{
            while(stack.length && ((ch === '^' && priority(ch)<priority(stack[stack.length-1])) || (ch !== '^' && priority(ch) <= priority(stack[stack.length-1])))){
                result += stack.pop();
            }
            stack.push(ch);
        }

    }
    
    while(stack.length){
        result += stack.pop();
    }

    return result;
}


function postfixToInfix(s){
    let stack = [];

    for(let i=0; i<s.length; i++){
        let ch = s[i];

        if(/[a-zA-Z0-9]/.test(ch)){
            stack.push(ch);
        }
        else{
            let s2 = stack.pop();
            let s1 = stack.pop();

            let str = "(" + s1 + ch + s2 + ")";
            stack.push(str);
        }
    }

    return stack.length ? stack[0] : "Invalid Expression!";
}





function priority(c){
    switch(c){
        case '^': return 3;
        case '*':
        case '/': return 2;
        case '+':
        case '-': return 1;
        default : return -1;
    }
}

function reverseExpression(s){
    let revString = "";

    for(let i=s.length-1; i>=0; i--){
        let ch = s[i];

        switch (ch) {
            case '(':
                revString += ')';
                break;
            case ')':
                revString += '(';
                break;
            default:
                revString += ch;
                break;
        }
    }

    return revString;
}







// function convertExp(){
//     let input = document.getElementById("infixInput").value;
    
//     if(input.trim() === ""){
//         document.getElementById("postfixResult").innerText = "Please Enter A Valid Expression.";
//         return;
//     }

//     let postfix = infixToPostfix(input);

//     document.getElementById("postfixResult").innerText = postfix;
// }