function infixToPostfix(s){
    let stack = [];
    let ans = "";

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


function convertExp(){
    let input = document.getElementById("infixInput").value;
    
    if(input.trim() === ""){
        document.getElementById("postfixResult").innerText = "Please Enter A Valid Expression.";
        return;
    }

    let postfix = infixToPostfix(input);

    document.getElementById("postfixResult").innerText = postfix;
}