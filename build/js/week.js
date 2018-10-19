'use sctrict';

(function () {
	//----------------- Dran n Drop

	const items =  document.querySelectorAll('.training-days__item');

	items.forEach( function (el){
		el.draggable = "true";
	})

	const itemsList =  document.querySelector('.training-days__list');
	let draggedItem = null;
	const dropeZone = document.querySelector('.week__list');
	const dropeZoneList = document.querySelector('.periods__list');



	const addDnDCard = (draggedItem) => {



			const card = template.cloneNode(true);

			window.util.setNameDnD(card, cardName, draggedItem);

			cardsList.insertBefore(card, periodsItemEmpty);



	};

	itemsList.addEventListener('dragstart', function (e) {
		if (e.target.className === 'training-days__item') {
			draggedItem = e.target;
			e.dataTransfer.setData('text/plain','This text may be dragged');
			// dropeZone.classList.add('setup-artifacts--dragzone');
		}
	});


	dropeZone.addEventListener('dragover', function (e) {
		e.preventDefault();
		return false;
	});

	dropeZone.addEventListener('drop', function (e) {

		// addDnDCard(draggedItem);
		e.target.classList.remove('week__item--hover');
		e.target.style.backgroundColor = '';
		e.preventDefault();
	});

	dropeZone.addEventListener('dragenter', function (e) {
		// e.target.style.backgroundColor = 'yellow';
		e.target.classList.add('week__item--hover');
		e.preventDefault();
	})

	dropeZone.addEventListener('dragleave', function (e) {
		// e.target.style.backgroundColor = '';
		e.target.classList.remove('week__item--hover');
		e.preventDefault();
	})

	dropeZone.addEventListener('dragend', function (e) {
		e.preventDefault();
		e.target.classList.remove('week__item--hover');
		dropeZone.classList.remove('setup-artifacts--dragzone');

	})
})();