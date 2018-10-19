'use strict';

(function () {
	const dayTab = document.querySelector('.day__name');
	const tabs = document.querySelectorAll('.day__name');
	let dayContainers = document.querySelectorAll('.day-container');
	let dayList = document.querySelector('.day__names-list');
	//временно поставил счетчик с 3. правильно надо ставить в ноль
	let tabsCounter = 3;

	[...dayList.children].forEach( element => {

		element.addEventListener('click', (e) => {
			const target = e.target;
			if (target.className === 'day__name--active' || target.className === 'day__add') {
							return;
			} else if (target.className === 'day__name-close') {
				let parentTab = target.closest('.day__name');
				let parentDay = document.querySelector('#' + parentTab.dataset.tab);

				if(parentDay != null) {
					parentDay.remove();
				}
				parentTab.remove();

				let tab = document.querySelectorAll('.day__name');

				if (tab.length == 1) {
					tab[0].classList.add('day__name--active');
					let currentDay = document.querySelector('#' + tab[0].dataset.tab);
					currentDay.classList.remove('day-container--hidden');
				} else {

					tab[tab.length-1].classList.add('day__name--active');
					let currentDay = document.querySelector('#' + tab[tab.length-1].dataset.tab);
					currentDay.classList.remove('day-container--hidden');
				}


			} else {
				removeClass();
				target.classList.add('day__name--active');
				showDay(target);
			}
		});

		let close = element.querySelector('.day__name-close');

		close.addEventListener('click', (e) => {
			const target = e.target;

			let parentTab = e.target.closest('.day__name');
			let parentDay = e.target.closest('.day-container');

			parentTab.remove();
			console.log('test');
			if(parentDay != null) {
				parentDay.remove();
			}

			// let tab = document.querySelectorAll('.day__name');

			// // if (tab.lenght == 1)
			// tab[0].classList.add('day__name--active');

		});
	})

	const removeClass = () => {
		let tabs = document.querySelectorAll('.day__name');

		tabs.forEach( (element) => {
			element.classList.remove('day__name--active');
		});
	};

	const showDay = (target) => {
		let dayContainers = document.querySelectorAll('.day-container');
		dayContainers.forEach( (element) => {
			element.classList.add('day-container--hidden');

			if (element.id === target.dataset.tab) {
				element.classList.remove('day-container--hidden');
				// element.classList.add('day-container--active');
			}
		});
	};

	// const showDayTwo = () => {
	// 	let dayContainers = document.querySelectorAll('.day-container');
	// 	dayContainers.forEach( (element) => {
	// 		element.classList.add('day-container--hidden');

	// 	});
	// };


	const tabTemplate = document.querySelector('#tab-template').content;
	const dayTemplate = document.querySelector('#day-template').content;

	const addDayBtn = document.querySelector('.day__add');
	const daysContentList = document.querySelector('.day');

	const createId = ()=> {
		return 'id' + (new Date()).getTime();
	};

	let daysList = [];

	const addDay = () => {


		tabsCounter++;
		let template = tabTemplate.cloneNode(true);
		let tab = template.querySelector('.day__name');
		// tab.dataset.tab = `day-${tabsCounter}`;
		tab.dataset.tab = `day-${createId()}`;
		tab.classList.add('day__name--active');
		const newDay = dayTemplate.cloneNode(true);
		const day = newDay.querySelector('.day-container');
		// day.id = `day-${tabsCounter}`;
		day.id = `day-${createId()}`

		dayList.insertBefore(tab, addDayBtn);

		daysContentList.appendChild(newDay);

		showDay(tab);
		daysList.push(day.id);


		// dropeZone = document.querySelector(`#${day.id}`);

	};

	addDayBtn.addEventListener('click', e => {

		removeClass();
		e.preventDefault();
		addDay();
		newTabEvent();
		newDayDnd();
		// reweriteDnD();


	});

	// const delDaysBtns = document.querySelectorAll('.ex__del');

	// delDaysBtns.forEach( el=> {
	// 	el.addEventListener('click', e => {
	// 		removeClass();
	// 		e.preventDefault();
	// 		addDay();
	// 		newTabEvent();
	// 		reweriteDnD();

	// 		let tab = document.querySelectorAll('.day__name');
	// 		// if (tab.lenght == 1)
	// 		tab[0].classList.add('day__name--active');
	// 	});
	// });



	const newTabEvent = () => {
		[...dayList.children].forEach( (element) => {

					element.addEventListener('click', event => {
						const target = event.target;
						if (target.className === 'day__name--active' || target.className === 'day__add') {
							return;
						} else if (target.className === 'day__name-close') {
							let parentTab = target.closest('.day__name');
							let parentDay = document.querySelector('#' + parentTab.dataset.tab);

							if(parentDay != null) {
								parentDay.remove();
							}
							parentTab.remove();

							let tab = document.querySelectorAll('.day__name');

							if (tab.length == 1) {
								tab[0].classList.add('day__name--active');
								let currentDay = document.querySelector('#' + tab[0].dataset.tab);
								currentDay.classList.remove('day-container--hidden');
							} else {

								tab[tab.length-1].classList.add('day__name--active');
								let currentDay = document.querySelector('#' + tab[tab.length-1].dataset.tab);
								currentDay.classList.remove('day-container--hidden');
							}


						} else {
							removeClass();
							target.classList.add('day__name--active');
							showDay(target);
						}

						let close = element.querySelector('.day__name-close');

						close.addEventListener('click', (e) => {
							const target = e.target;

							let parentTab = e.target.closest('.day__name');
							let parentDay = e.target.closest('.day-container');

							parentTab.remove();
							if(parentDay != null) {
								parentDay.remove();
							}

							// let tab = document.querySelectorAll('.day__name');

							// if (tab.lenght == 1)
							// tab[0].classList.add('day__name--active');

						});
					});
				})
	}

	//----------------- Dran n Drop

	let draggableItems =  document.querySelectorAll('.search-ex__item');

	draggableItems.forEach( function (el){
		el.draggable = "true";
	})

	const draggbleList =  document.querySelector('.search-ex');
	let draggedItem = null;


	const exerciseTemplate = document.querySelector('#ex-template').content;

	const addDnDCard = (draggedItem, elem, id) => {
			let card = exerciseTemplate.cloneNode(true);
			let ex = card.querySelector('.ex');
			ex.id = id;
			// window.util.setNameDnD(card, cardName, draggedItem);
			elem.appendChild(card);
			let exEdit = ex.querySelector('.ex__edit');
			let exDel = ex.querySelector('.ex__del');
			addModalEvent(exEdit);
			delExerciseEvent(exDel);

	};

	let exercises = [];

	let newDayDnd = () => {
		let dropeZone = document.querySelector('.day-container:last-child');

			draggbleList.addEventListener('dragstart', function (e) {
				if (e.target.className === 'search-ex__item') {
					draggedItem = e.target;

					e.dataTransfer.setData('text/plain','This text may be dragged');
					dropeZone.classList.add('setup-artifacts--dragzone');
				}
			});


			dropeZone.addEventListener('dragover', function (e) {
				e.preventDefault();
				if(e.target.className !== 'day__name--active') {
					return false;
				}
			});

			dropeZone.addEventListener('drop', function (e) {
				console.dir(dropeZone);
				if(e.target.className === 'day-container setup-artifacts--dragzone') {
					let title = draggedItem.querySelector('.search-ex__title').textContent;
					let uniq = 'id' + (new Date()).getTime();
					let dayId = e.target.id;

					let newObj = new Exercise(title, uniq, dayId);
					// let newObj = new Exercise(title, uniq);

					exercises.push(newObj);

					addDnDCard(draggedItem, dropeZone, uniq);

				}


				e.target.style.backgroundColor = '';
				e.preventDefault();
			});

			dropeZone.addEventListener('dragenter', function (e) {
				if(e.target.className === 'day-container setup-artifacts--dragzone'){
					e.target.style.backgroundColor = 'yellow';
				}

				e.preventDefault();
			});

			dropeZone.addEventListener('dragleave', function (e) {
				e.target.style.backgroundColor = '';
				e.preventDefault();
			});

			draggbleList.addEventListener('dragend', function (e) {
				e.preventDefault();

				dropeZone.classList.remove('setup-artifacts--dragzone');

			});

		};


	let reweriteDnD = () => {
		let dropeZone = document.querySelectorAll('.day-container');
		console.dir(dropeZone);
		dropeZone.forEach( elem => {


				draggbleList.addEventListener('dragstart', function (e) {
					if (e.target.className === 'search-ex__item') {
						draggedItem = e.target;

						e.dataTransfer.setData('text/plain','This text may be dragged');
						elem.classList.add('setup-artifacts--dragzone');
					}
				});


				elem.addEventListener('dragover', function (e) {
					e.preventDefault();
					if(e.target.className !== 'day__name--active') {
						return false;
					}
				});

				elem.addEventListener('drop', function (e) {
					console.dir(elem);
					if(e.target.className === 'day-container setup-artifacts--dragzone') {
						let title = draggedItem.querySelector('.search-ex__title').textContent;
						let uniq = 'id' + (new Date()).getTime();
						let dayId = e.target.id;

						let newObj = new Exercise(title, uniq, dayId);
						// let newObj = new Exercise(title, uniq);

						exercises.push(newObj);

						addDnDCard(draggedItem, elem, uniq);

					}


					e.target.style.backgroundColor = '';
					e.preventDefault();
				});

				elem.addEventListener('dragenter', function (e) {
					if(e.target.className === 'day-container setup-artifacts--dragzone'){
						e.target.style.backgroundColor = 'yellow';
					}

					e.preventDefault();
				})

				elem.addEventListener('dragleave', function (e) {
					e.target.style.backgroundColor = '';
					e.preventDefault();
				})

				draggbleList.addEventListener('dragend', function (e) {
					e.preventDefault();

					elem.classList.remove('setup-artifacts--dragzone');

				})
			});
	}

	reweriteDnD();


	// Поиск упражнений
	const input = document.querySelector('.days-sidebar__input');

	const searching = () => {
		let	text = input.value.toUpperCase();

		let item = document.querySelectorAll('.search-ex__item');

		item.forEach( element => {
				let title = element.querySelector('.search-ex__title');
				if (title.innerHTML.toUpperCase().indexOf(text) > -1) {
					element.style.display = "";
				}
				else {
					element.style.display = "none";
				}
		})
	}

	input.addEventListener('keyup', () => {
		searching();
	});

	// window.load( (data) => {
	// 	console.dir(data);
	// });

	const sendJson = document.querySelector('.header__save');

	sendJson.addEventListener('click', ()=> {
		let jsonObj = JSON.stringify(exercises);

		window.upload(jsonObj , (data) => {

			console.log(data);
		});
	});

		// let jsonObj = JSON.stringify(exercises);

		// window.upload(jsonObj , (data) => {

		// 	console.log(data);
		// });


	// Modal window

	let modal = document.querySelector('.modal');
	let saveBtn = document.querySelector('.modal__save');

	let exEdit = document.querySelectorAll('.ex__edit');
	let exDel = document.querySelectorAll('.ex__del');
	// let exEdit1 = document.querySelector('.ex__edit');
	// let oneEx = document.querySelector('.ex');

	const closeBtn = document.getElementsByClassName("close")[0];


	let parent;


	const addModalEvent = (elem)=> {
		elem.addEventListener('click', (e) => {
			modal.style.display = "block";
			parent = e.target.closest('.ex');

			saveBtn.addEventListener('click', (e) => {
				e.preventDefault();
				saveHendler(parent);

			});
		});
	};

	const delExerciseEvent = (elem)=> {
		elem.addEventListener('click', (e) => {
			parent = e.target.closest('.ex');
			parent.remove();
		});
	};

	exEdit.forEach( (elem)=> {
		console.dir(elem);
		addModalEvent(elem);
	});


	exDel.forEach( (elem)=> {

		delExerciseEvent(elem);
	});




	// exDelLsit.addEventListener('click', function (e) {

	// 	const deleteBtn = exDelLsit.querySelector('.ex__del');

	// 	const target = e.target;

	// 	if (e.target.classList[0] == deleteBtn.classList[0]) {

	// 		target.closest('.ex').remove();
	// 	}

	// });



	let saveHendler = (parent)=>{

		let exApproach = parent.querySelector('.ex__approach');
		let exRepeat = parent.querySelector('.ex__repeat');
		let exRest = parent.querySelector('.ex__rest');
		let weightValue = parent.querySelector('.weight__value');

		let modalApproach = modal.querySelector('.modal__approach');
		let modalRepeat = modal.querySelector('.modal__repeat');
		let modalRest = modal.querySelector('.modal__rest');
		let modalWeight= modal.querySelector('.modal__weight');

		exApproach.textContent = modalApproach.value;
		exRepeat.textContent = modalRepeat.value;
		exRest.textContent = modalRest.value;
		weightValue.textContent = modalWeight.value;
		modal.style.display = "none";


		let parentId = parent.id;
		exercises.forEach( (el) => {
			if(el.id == parentId){
				el.approach = modalApproach.value;
				el.repeat = modalRepeat.value;
				el.rest = modalRest.value;
				el.weight = modalWeight.value;
				console.log(el);
			}
		});


	};




	closeBtn.addEventListener('click', () => {
		modal.style.display = "none";
	});

	window.addEventListener('click', (e) => {
		if (event.target == modal) {
			modal.style.display = "none";
		}

	});


	// Создание объекта при переносе в день

	const Exercise = function (title, id, dayId) {
		this.id = id;
		this.name = title;
		this.approach = 0;
		this.repeat = 0;
		this.rest = 0;
		this.weight = 0;
		this.dayId = dayId;
	};






	// Сбор данных для отправки

	/*

	const getCards = (day) => {
		let cards =  day.querySelectorAll('.ex');
		// console.dir(cards);
		cards.forEach((card) => {
			getData(card);
		})

		let titles = cards.map((card) => {
			return getData(card);
		})
	};

	const getData = (card) => {
		let title =  card.querySelector('.ex__title');
		// console.log(title.innerText);
		return title.innerText;
	};

	window.onload = () => {


		let jsonOgj = {};

		let days = document.querySelectorAll('.day-container');

		days.forEach( (elem)=> {
			let titles = getCards(elem);

			jsonOgj[elem.id] = {
				'getCards(elem)': 'titles'
			};

		});

		console.dir(jsonOgj);
	};

		*/



})();