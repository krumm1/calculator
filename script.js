const calculator = {
	outputPrev: document.querySelector("[data-previous-operand]"),
	outputCurr: document.querySelector("[data-current-operand]"),
	clearBtn: document.querySelector("[data-all-clear]"),
	deleteBtn: document.querySelector("[data-delete]"),
	equalsBtn: document.querySelector("[data-equals]"),
	operatorButtons: document.querySelectorAll("[data-operator]"),
	numberButtons: document.querySelectorAll("[data-number]"),
	currentOperand: "",
	previousOperand: "",
	operator: "",
	calculated: false,
	calculate: function () {
		let result = 0;
		const prev = parseFloat(this.previousOperand);
		const curr = parseFloat(this.currentOperand);

		if (isNaN(prev) || isNaN(curr)) return;

		switch (this.operator) {
			case "+":
				result = prev + curr;
				break;
			case "-":
				result = prev - curr;
				break;
			case "*":
				result = prev * curr;
				break;
			case "/":
				result = curr === 0 ? 0 : prev / curr;
				break;
			default:
				return;
		}

		this.currentOperand = result;
		this.operator = "";
		this.previousOperand = "";
		this.calculated = true;
	},
	delete: function () {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	},
	clearAll: function () {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operator = "";
	},
	chooseOperator: function (operator) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.calculate();
		}
		this.operator = operator;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	},
	appendNumber: function (number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	},
	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];
		let integerDisplay;

		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("ru", {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	},
	updateDisplay: function () {
		this.outputCurr.innerText = this.getDisplayNumber(this.currentOperand);

		if (this.operator != null) {
			this.outputPrev.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)} ${this.operator}`;
		} else {
			this.outputPrev.innerText = "";
		}
	},
	init: function () {
		this.numberButtons.forEach((button) => {
			button.addEventListener("click", () => {
				if (this.calculated) {
					this.calculated = false;
					this.clearAll();
					this.updateDisplay();
				}

				this.appendNumber(button.innerText);
				this.updateDisplay();
			});
		});

		this.operatorButtons.forEach((button) => {
			button.addEventListener("click", () => {
				this.chooseOperator(button.innerText);
				this.updateDisplay();
			});
		});

		this.equalsBtn.addEventListener("click", () => {
			this.calculate();
			this.updateDisplay();
		});

		this.deleteBtn.addEventListener("click", () => {
			this.delete();
			this.updateDisplay();
		});

		this.clearBtn.addEventListener("click", () => {
			this.clearAll();
			this.updateDisplay();
		});
	},
};

calculator.init();
