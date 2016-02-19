$(document).ready(function(){
	var IOfield = $("#IOfield");
	var IOstring = IOfield.val().toString();
	var lastOperator = 0;
	var operatorFlag = true;
	var decimalFlag = false;
	var answerFlag = false;
	var negFlag = false;
	var parFlag = false;

	$(".number").on("click", function(){
		if(!parFlag){
			if(answerFlag){
				IOstring = $(this).text();
				answerFlag = false;
				negFlag = false;
			} else{
				IOstring = IOstring + $(this).text();
			}
			var last = IOstring.length -1;
			operatorFlag = false;
			// console.log(IOstring[last]);
			IOfield.val(IOstring);
			// alert($(this).text());
		}
	});

	$(".plus").on("click", function(){
		if(operatorFlag == false){
			IOstring = IOstring + " + ";
			decimalFlag = false;
			operatorFlag = true;
			IOfield.val(IOstring);
		} else{
			deleteChar();
			IOstring = IOstring + " + ";
			decimalFlag = false;
			operatorFlag = true;
			IOfield.val(IOstring);
		}
	});

	$(".minus").on("click", function(){
		if(operatorFlag == false){
			IOstring = IOstring + " - ";
			decimalFlag = false;
			operatorFlag = true;
			IOfield.val(IOstring);
		} else{
			deleteChar();
			IOstring = IOstring + " - ";
			decimalFlag = false;
			operatorFlag = true;
			IOfield.val(IOstring);
		}
	});

	$(".times").on("click", function(){
		if(operatorFlag == false){
			IOstring = IOstring + " * ";
			decimalFlag = false;
			operatorFlag = true;
			IOfield.val(IOstring);
		} else{
			deleteChar();
			IOstring = IOstring + " * ";
			decimalFlag = false;
			operatorFlag = true;
			IOfield.val(IOstring);
		}
	});

	$(".division").on("click", function(){
		if(operatorFlag == false){
			IOstring = IOstring + " / ";
			decimalFlag = false;
			operatorFlag = true;
			IOfield.val(IOstring);
		} else{
			deleteChar();
			IOstring = IOstring + " / ";
			decimalFlag = false;
			operatorFlag = true;
			IOfield.val(IOstring);
		}
	});

	$(".operator").on("click", function(){
		
			answerFlag = false;
			negFlag = false;
			parFlag = false;
			lastOperator = IOstring.length - 1;
			// console.log(IOstring);
			// console.log(lastOperator);
		
			
	});

	$(".clear").on("click", function(){
		IOstring = "";
		IOfield.val(+IOstring);
		lastOperator = 0;
		operatorFlag = true;
		decimalFlag = false;
		answerFlag = false;
		negFlag = false;
		parFlag = false;
	});

	$(".equals").on("click", function(){
		// console.log("working");
		var answer = eval(IOstring);
		// console.log(answer);
		if(answer < 0){
			IOstring = "("+ answer.toString() + ")";
			negFlag = true;
		} else{
			negFlag = false;
			IOstring = answer.toString();
		}
		IOfield.val(IOstring);
		answerFlag = true;
		decimalFlag = false;
		parFlag = false;
		lastOperator = 0;	
		// IOfield.val(eval(IOstring));
	});

	$('.decimal').on('click', function(){
		if(!parFlag){
			if(!decimalFlag){
				if(answerFlag){
					IOstring = $(this).text();
					// console.log(IOstring);
					answerFlag = false;
				} else{
					IOstring = IOstring + $(this).text();
				}
				decimalFlag = true;
				IOfield.val(IOstring);
			}
		}
	});

	$(".posneg").on("click", function(){
		if(!operatorFlag){
			if(!negFlag){
				var lastNumber = IOstring.slice(lastOperator, IOstring.length);
				console.log("LN length " + lastNumber.length);
				var restOf = IOstring.slice(0, lastOperator);
				// console.log("rest " + restOf);
				// console.log("last Number " + lastNumber);
				// console.log(IOstring);
				var newNumber = "(-" + lastNumber +")";
				// console.log("new Number " + newNumber);
				IOstring = restOf + newNumber;
				IOfield.val(IOstring);
				negFlag = true;
				parFlag = true;
			} else{
				// console.log(IOstring);
				var lastNumber = IOstring.slice(lastOperator + 2, IOstring.length - 1);
				// console.log("lastNum " + lastNumber + "more")
				var restOf = IOstring.slice(0, lastOperator);
				// console.log("rest of " + restOf + "more");
				IOstring = "";
				IOstring = restOf + lastNumber;
				// console.log("string " + IOstring);
				IOfield.val(IOstring);
				negFlag = false;
				parFlag = false;
			}
		}
		
		
	});

	$(".delete").on("click", deleteChar);

	function deleteChar(){
		var deletedChar = IOstring[IOstring.length-1];
		console.log(deletedChar);
		var nextChar = IOstring[IOstring.length-2];
		console.log(nextChar);
		console.log(deletedChar);
		if(!negFlag){
			IOstring = IOstring.slice(0, -1);
			// console.log(IOstring);
			IOfield.val(IOstring);

			if(IOstring.length <= 0){
				operatorFlag = true;
				decimalFlag = false;
			}
		}
		if (deletedChar =="+"|| deletedChar =="-"|| deletedChar =="/"|| deletedChar =="*"){
			operatorFlag = false;
			lastOperator = findLastOperator(IOstring);
			var lastNum = IOstring.slice(lastOperator, IOstring.length);
			if(lastNum.indexOf(".") >= 0){
				decimalFlag = true;
			}
			console.log("length " + IOstring.length);
		} else if (deletedChar == "."){
			decimalFlag = false;
		}
		if(nextChar === " " || nextChar === "+" || nextChar === "-" || nextChar === "*" || nextChar === "/"){
			console.log("deleted space")
			deleteChar();
		}


	}

	function findLastOperator(str){
		var lastOp = 0;
		var lastPlus = str.lastIndexOf("+");
		if (lastPlus > lastOp){
			lastOp = lastPlus+1;
		}
		var lastMinus = str.lastIndexOf("-");
		if (lastMinus > lastOp){
			lastOp = lastMinus+1;
		}
		var lastDivide = str.lastIndexOf("/");
		if (lastDivide > lastOp){
			lastOp = lastDivide+1;
		}
		var lastMultiply = str.lastIndexOf("*");
		if (lastMultiply > lastOp){
			lastOp = lastMultiply+1;
		}
		return lastOp;
	}

	$(document).on("keydown"/*or maybe keyup*/,function(key){
		// console.log("keypress " + key.keyCode);
	});
});
	
