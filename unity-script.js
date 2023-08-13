'use strict';

const $ = (selector) => {
	return document.querySelector(selector);
}

const randomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEmpty = arr => arr.length === 0;

const changeColorSelectors = (arr, color) => {
	for (let selector of arr){
		selector.style.backgroundColor = color;
	}
};

class Field{
	constructor(table, collum, line, writeInTd = " "){
		this.table = table;
		this.collum = collum;
		this.line = line;
		this.writeInTd = writeInTd;
	}

	writeField(){
		for (let i=0; i < this.collum; i++){
			let tr = document.createElement('tr');
			tr.className = `tr-${i}`;
	
			for (let j=0; j < this.line; j++){
				let td = document.createElement('td');
				td.className = `td-${j}`;
				td.textContent = this.writeInTd;
				tr.appendChild(td);
			}
	
		this.table.appendChild(tr);
		}
	}

	mathActionBy(userAction, arr, byWhatIndex){
		window.addEventListener(userAction, (event) => {
			if (isEmpty(arr)) return;

			switch(event.key){
				case "+":
					arr[byWhatIndex].textContent = arr.reduce((prev, current) => {
						return +prev.textContent + (+current.textContent);
					});
					break;

				case "-":
					arr[byWhatIndex].textContent = arr.reduce((prev, current) => {
						return +prev.textContent - (+current.textContent);
					});
					break;

				case "*":
					arr[byWhatIndex].textContent = arr.reduce((prev, current) => {
						return +prev.textContent * (+current.textContent);
					});
					break;

				case "/":
					arr[byWhatIndex].textContent = arr.reduce((prev, current) => {
						return parseInt(+prev.textContent / (+current.textContent));
					});
					break;
			}
		});
	}

	win(){
		const allTdInTable = this.table.querySelectorAll('td');

		for (let i=0; i < this.line; i++){
			const a = (i + 1) === this.line;
			console.log(allTdInTable[i]);
			if (allTdInTable[i].textContent !== allTdInTable[i + a].textContent) return false;
		}

		return true;
	}
}

//const startProgramm = () => {
	const $field = $('.field');
	const collum = 3; // +prompt("Ячеек в колнке", 3)
	const line = 3; // +prompt("Ячеек в строке таблицы", 3)
	const field = new Field($field, collum, line, "_");

	field.writeField();

	const allTrInField = $field.querySelectorAll('tr');
	const allTdInField = $field.querySelectorAll('td');

	console.log(allTrInField);

	// write in table random numbers

	for (let i=0; i < collum; i++){
		for (let j=0; j < line; j++){
			allTrInField[i].querySelector(`.td-${j}`).textContent = randomInt(2, collum * line);
		}
	}

	// задаём единое число

	const posCollum = randomInt(0, collum-1);
	const posLine = randomInt(0, line-1);
	const posUnity = $field.childNodes[posCollum].childNodes[posLine];
	const unity = +posUnity.textContent;

	posUnity.style.textDecoration = "underline";
	posUnity.style.fontStyle = "italic";

	console.log(unity);

	// !!!!!!! делегируем клик на все td в таблице

	let counterClick = 0;
	const maxClick = 1;
	let operandSelectors = new Array(maxClick + 1);
	let changedColor = false;

	deligate($field, 'TD', 'click', 
		(event) => {
		if (counterClick === maxClick){
			operandSelectors[counterClick] = event.target;
			event.target.style.backgroundColor = '#DEB887';
			counterClick = 0;
		}
		else{
			if (operandSelectors[0] !== undefined){
				changeColorSelectors(operandSelectors, '#fff');
				changedColor = true;
			}

			operandSelectors[counterClick] = event.target;
			event.target.style.backgroundColor = '#808080';
			counterClick++;
		}
	});

	field.mathActionBy('keypress', operandSelectors, 0);
// };