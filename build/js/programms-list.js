'use strict';

(function () {
	const inputNode = document.querySelector('.add-programm__input');
	const addProgrammBtn = document.querySelector('.add-programm__btn');
	const programmTemplate = document.querySelector('template').content;
	const progListTable = document.querySelector('.prog-list__table');
	const basePlaceholderText = inputNode.placeholder;
	const cardName = '.prog-list__name';
	const errorClass = 'add-programm__input--error';


	const addProgramm = () => {
		if (inputNode.value.trim()) {

			inputNode.classList.remove(errorClass);
			const card = programmTemplate.cloneNode(true);
			// makeProg(card);
			window.util.setName(card, cardName, inputNode);
			progListTable.appendChild(card);


		} else {
			inputNode.classList.add(errorClass);
			inputNode.placeholder = 'Вы забыли ввести название программы';
		}
	};



	addProgrammBtn.addEventListener('focus', e => {
		e.preventDefault();
		window.util.hideError(inputNode, errorClass, basePlaceholderText);
	});

	addProgrammBtn.addEventListener('blur', () => {
		window.util.hideError(inputNode, errorClass, basePlaceholderText);
	});

	addProgrammBtn.addEventListener('keydown', e => {
		e.preventDefault();

		if (e.keyCode === 13) {
			addProgramm();
		}
	});

	addProgrammBtn.addEventListener('click', e => {
		e.preventDefault();
		addProgramm();

	});

	progListTable.addEventListener('click', e => {

		const deleteBtn = progListTable.querySelector('div.prog-list__del');
		const target = e.target;

		if (e.target.className === deleteBtn.className) {

			target.closest('.prog-list__row').remove();
		}


		if (e.target.className === 'prog-list__btn-wrapper') {
			target.parentNode.className += ' prog-list__control--active';

			const controleBtns = target.previousElementSibling;
			controleBtns.classList.remove('prog-list__control-wrapper--hiden');
		}
	});




})();
