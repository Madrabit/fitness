'use strict';

(function () {

	const periodsList = document.querySelector('.periods__list');
	const inputNode =  document.querySelector('.add-period__input');
	const template = document.querySelector('template').content;
	const cardsList = document.querySelector('.periods__list');
	const cardName = '.periods__link';
	const addBtn = document.querySelector('.add-period__btn');
	const periodsItemEmpty = document.querySelector('.periods__item--empty');
	const basePlaceholderText = inputNode.placeholder;
	const errorClass = 'add-period__input--error';



	const addCard = () => {
		if (inputNode.value.trim()) {

			inputNode.classList.remove(errorClass);
			const card = template.cloneNode(true);

			window.util.setName(card, cardName, inputNode);

			cardsList.insertBefore(card, periodsItemEmpty);

		} else {
			inputNode.classList.add(errorClass);
			inputNode.placeholder = 'Не введено название';
		}
	};






	addBtn.addEventListener('focus', e => {
		e.preventDefault();
		window.util.hideError(inputNode, errorClass, basePlaceholderText);
	});

	addBtn.addEventListener('blur', () => {
		window.util.hideError(inputNode, errorClass, basePlaceholderText);
	});

	addBtn.addEventListener('keydown', e => {
		e.preventDefault();

		if (e.keyCode === 13) {
			addCard();
		}
	});

	addBtn.addEventListener('click', e => {
		e.preventDefault();
		addCard();

	});

	periodsList.addEventListener('click', function (e) {
		const editBtn = periodsList.querySelector('.periods__edit');
		const deleteBtn = periodsList.querySelector('.periods__del');

		const target = e.target;

		if (e.target.classList[0] == deleteBtn.classList[0]) {

			target.closest('.periods__item').remove();
		}

		if (e.target.classList[0] == editBtn.classList[0]) {

			const parent = target.closest('.periods__item');
			const link = parent.querySelector('.periods__link');
			link.contentEditable = true;
			window.util.limitEditor(link, 15);
		}

	});

	//----------------- Dran n Drop

	const periodExampleItems =  document.querySelectorAll('.period-example__item');

	periodExampleItems.forEach( function (el){
		el.draggable = "true";
	})

	const periodExampleList =  document.querySelector('.period-example');
	let draggedItem = null;
	const dropeZone = document.querySelector('.periods__item--empty');
	const dropeZoneList = document.querySelector('.periods__list');
	const periodsItem = document.querySelector('.periods__item');


	const addDnDCard = (draggedItem) => {



			const card = template.cloneNode(true);

			window.util.setNameDnD(card, cardName, draggedItem);

			cardsList.insertBefore(card, periodsItemEmpty);



	};

	periodExampleList.addEventListener('dragstart', function (e) {
		if (e.target.className === 'period-example__item') {
			draggedItem = e.target;
			e.dataTransfer.setData('text/plain','This text may be dragged');
			dropeZone.classList.add('setup-artifacts--dragzone');
		}
	});


	dropeZone.addEventListener('dragover', function (e) {
		e.preventDefault();
		return false;
	});

	dropeZone.addEventListener('drop', function (e) {

		addDnDCard(draggedItem);

		e.target.style.backgroundColor = '';
		e.preventDefault();
	});

	dropeZone.addEventListener('dragenter', function (e) {
		e.target.style.backgroundColor = 'yellow';
		e.preventDefault();
	})

	dropeZone.addEventListener('dragleave', function (e) {
		e.target.style.backgroundColor = '';
		e.preventDefault();
	})

	periodExampleList.addEventListener('dragend', function (e) {
		e.preventDefault();

		dropeZone.classList.remove('setup-artifacts--dragzone');

	})



})();



