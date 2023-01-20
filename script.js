const screen = document.querySelector(".screen");
const screenContent = document.querySelector(".screen-content");

const data = {
	numbers: {
		n1: "0",
		n2: "0",
	},
	currentOperation: null,
	result: null,
	operations: {
		somar: { operation: (n1, n2) => n1 + n2, symbol: "+" },
		subtrair: { operation: (n1, n2) => n1 - n2, symbol: "-" },
		multiplicar: { operation: (n1, n2) => n1 * n2, symbol: "×" },
		dividir: { operation: (n1, n2) => n1 / n2, symbol: "÷" },
	},
	actions: {
		limpar: () => {
			for (const number in data.numbers) {
				data.numbers[number] = "0";
			}
			data.currentOperation = null;
			data.result = null;

			let paragraphs = document.querySelector(".paragraph-content");
			while (paragraphs) {
				paragraphs.parentNode.removeChild(paragraphs);
				paragraphs = document.querySelector(".paragraph-content");
			}

			updateScreen()
		},
		excluir: () => {
			if (!data.currentOperation && data.numbers.n1 > 0) {
				data.numbers.n1 = data.numbers.n1.substring(
					0,
					data.numbers.n1.length - 1
				);

				if (data.numbers.n1.length === 0) {
					data.numbers.n1 = "0";
				}
			} else if (data.currentOperation && data.numbers.n2.length === 0) {
				data.currentOperation = null;
			} else if (data.currentOperation && data.numbers.n2 > 0) {
				data.numbers.n2 = data.numbers.n2.substring(
					0,
					data.numbers.n2.length - 1
				);
			}
		},
		igual: () => {
			if (data.currentOperation) {
				data.result = `${data.operations[
					data.currentOperation
				].operation(
					parseFloat(data.numbers.n1),
					parseFloat(data.numbers.n2)
				)}`;

				data.numbers.n1 = data.result;

				newParagraph(
					data.numbers.n2,
					data.operations[data.currentOperation].symbol,
					true
				);

				data.numbers.n2 = "0";
				data.currentOperation = null;
			}
		},
	},
};

const handleClick = (input) => {
	if (isFinite(input) && data.result) {
		newParagraph(data.result);
		data.result = null;
		data.numbers.n1 = "0";
	}

	if (/[\d.]/.test(input)) {
		setNumbers(input);
	} else if (data.operations[input]) {
		setCurrentOperation(input);
	} else if (data.actions[input]) {
		data.actions[input]();
	}
	console.log(data.result);

	updateScreen();

	console.log(data.numbers.n1, data.numbers.n2, data.currentOperation);
};

const setNumbers = (number) => {
	if (!data.currentOperation) {
		if (
			(number === "." && !data.numbers.n1.includes(".")) ||
			number != "."
		) {
			data.numbers.n1 += number;
		}
	} else {
		if (
			(number === "." && !data.numbers.n2.includes(".")) ||
			number != "."
		) {
			data.numbers.n2 += number;
		}
	}
};

const setCurrentOperation = (operation) => {
	if (!data.currentOperation && data.numbers.n2.length === 0) {
		data.currentOperation = operation;
	} else {
		data.actions.igual();
		data.currentOperation = operation;
	}

	data.result = null;

	newParagraph(data.numbers.n1);
};

const updateScreen = () => {
	formatNumbers();

	if (!data.currentOperation) {
		if (data.result) {
			screen.value = data.result;
		} else {
			screen.value = data.numbers.n1;
		}
	} else {
		screen.value =
			data.operations[data.currentOperation].symbol + data.numbers.n2;
	}
};

const formatNumbers = () => {
	for (let number in data.numbers) {
		if (
			data.numbers[number][0] === "0" &&
			data.numbers[number][1] != "." &&
			data.numbers[number].length > 1
		) {
			data.numbers[number] = data.numbers[number].substring(
				1,
				data.numbers[number].length
			);
		}

		if (isNaN(data.numbers[number])) {
			data.numbers[number] = "0";
		}
	}
};

const newParagraph = (number, symbol = null, insertLine = false) => {
	const paragraph = document.createElement("div");
	paragraph.setAttribute("class", "paragraph-content");
	if (insertLine) {
		paragraph.setAttribute("style", "border-bottom: 1px solid white;");
	}
	paragraph.innerHTML = ``;

	if (symbol) {
		paragraph.innerHTML += `<p class="paragraph-symbol">${symbol}`;
	}
	paragraph.innerHTML += `<p class="paragraph-text">${number}</p>`;

	screen.parentNode.insertBefore(paragraph, screen.nextSibling);
};

updateScreen();
