let inputs = document.querySelectorAll("#buttons");
let textArea = document.querySelector("#numbers");
textArea.textContent = "0";

inputs.forEach(input => input.addEventListener("click", addValue));

let precedence = {
	"+": 1,
	"-": 1,
	"x": 2,
	"/": 2
};

/* CLEAR AREA AND OPERATIONS */
function clearArea() {
	textArea.textContent = "0";
}

function callOper(x, y, oper) {
	let res = 0;
	
	if (oper == "+") {
		res = add(x, y);
	}
	
	else if (oper == "-") {
		res = subtract(x, y);
	}
	
	else if (oper == "x") {
		res = multiply(x, y);
	}
	
	else if (oper == "/") {
		if (y == 0) {
			alert("Division by zero is not allowed!");
		}
		
		else {
			res = divide(x, y);
		}
	}
	
	return res;
}

function add(x, y) {
	if (Number.isInteger(x + y) == false)
		return (x + y).toFixed(2);
	else
		return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	if (Number.isInteger(x * y) == false)
		return (x * y).toFixed(2);
	else
		return x * y;
}

function divide(x, y) {
	return Math.round(x / y * 100) / 100;
}

function operate(s) { // SHUNTING YARD ALGORITHM
	let stack = [];
	let queue = [];
	let oper = "";
	let spoji = "";
	let a = 0;
	let b = 0;
	let res = 0;
	
	for (let i = 0; i < s.length; i++) {
		if ((s[i] >= 0 && s[i] <= 9) || (s[i] == "-" && Number(s[i - 1]) != s[i - 1]) || s[i] == ".") {
			spoji = "";
			
			while ((s[i] >= 0 && s[i] <= 9) || (s[i] == "-" && Number(s[i - 1]) != s[i - 1]) || s[i] == ".") {
				spoji += s[i]
				i++;
			}
			
			queue.push(Number(spoji));
			i--;
		}
		
		else if (s[i] != "(" && s[i] != ")") {
			while (precedence[stack[stack.length - 1]] > precedence[s[i]] || precedence[stack[stack.length - 1]] == precedence[s[i]]) {
				queue.push(stack.pop());
			}
			stack.push(s[i]);	
		}
		
		else if (s[i] == "(") {
			stack.push(s[i]);
		}
		
		else if (s[i] == ")") {
			while (stack[stack.length - 1] != "(") {
				queue.push(stack.pop());
			}
			stack.pop();
		}
	}
	
	while(stack.length)
		queue.push(stack.pop());
	
	
	for (let i = 0; i < queue.length; i++) {
		if (Number(queue[i]) != queue[i]) {
			oper = queue[i];
			a = queue[i - 2];
			b = queue[i - 1];
			res = Number(callOper(a, b, oper));
			queue[i - 2] = res;
			queue.splice(i - 1, 2);
			i = 0;
		}
	}
	
	textArea.textContent = queue;
	
}
/* END OF CLEAR AREA AND OPERATIONS */


function addValue(e) {
	let inputArea = e.target.textContent;
	let s = textArea.textContent;
	
	if (inputArea == "=") {
		let s = textArea.textContent;
		operate(s);
	}
	
	else if (inputArea == "C") {
		clearArea();
	}
	
	else if (inputArea == "Del") {
		let s = textArea.textContent;
		s = s.slice(0, s.length - 1);
		textArea.textContent = s;
		if (textArea.textContent == "")
			textArea.textContent = 0;
	}
	
	else if (e.target.classList.value == "arith") {
		let s = textArea.textContent;
		if (s[s.length - 1] == Number(s[s.length - 1]) || e.target.textContent == "(" || s[s.length - 1] == ")" || (s[s.length - 1] == "(" && e.target.textContent == "-")) {
			if (e.target.textContent == "(" && s[s.length - 1] != Number(s[s.length - 1])) {
				textArea.textContent += inputArea;
			}
			
			else if (e.target.textContent == "(" && s[0] == "0") {
				textArea.textContent = "";
				textArea.textContent += inputArea;
			}
	
			else if (e.target.textContent != "(") {
				textArea.textContent += inputArea;
			}

		}
	}

	else {
		if (s[0] == "0") {
			textArea.textContent = "";
		}
		
		if (s.length < 20) {
			textArea.textContent += inputArea;
		}
	}
	
	
}