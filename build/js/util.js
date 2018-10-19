'use sctrict';

(function () {

    let account = document.querySelector('.account');
    let accountMenu = document.querySelector('.account__menu');

    account.addEventListener('click', (e) => {
        e.stopPropagation();
        accountMenu.classList.toggle('account__menu--show');
        account.classList.toggle('account--show');

    });

    window.addEventListener('click', () => {
        if (accountMenu.classList.contains('account__menu--show')) {
            accountMenu.classList.remove('account__menu--show');
            account.classList.remove('account--show');

        }
    });

	window.util =  {
		setName: (elem, name, inputNode) => {
			const nameNode = elem.querySelector(name);
			nameNode.innerText = inputNode.value;
			inputNode.value = '';

		},

		setNameDnD: (elem, name, inputNode) => {
			const nameNode = elem.querySelector(name);
			nameNode.innerText = inputNode.innerText;


		},

		hideError: (inputNode, errorClass, defaultPlaceholder) => {
					inputNode.classList.remove(errorClass);
					inputNode.placeholder = defaultPlaceholder;
				},
		limitEditor: (link, maxLength) => {
			const settings = {
			  maxLen: maxLength,
			}

			const keys = {
			  'backspace': 8,
			  'shift': 16,
			  'ctrl': 17,
			  'alt': 18,
			  'delete': 46,
			  'enter': 13,
			  // 'cmd':
			  'leftArrow': 37,
			  'upArrow': 38,
			  'rightArrow': 39,
			  'downArrow': 40,

			}

			const utils = {
			  special: {},
			  navigational: {},
			  isSpecial(e) {
				return typeof this.special[e.keyCode] !== 'undefined';
			  },
			  isNavigational(e) {
				return typeof this.navigational[e.keyCode] !== 'undefined';
			  }
			}

			utils.special[keys['backspace']] = true;
			utils.special[keys['shift']] = true;
			utils.special[keys['ctrl']] = true;
			utils.special[keys['alt']] = true;
			utils.special[keys['delete']] = true;
			utils.special[keys['enter']] = false;

			utils.navigational[keys['upArrow']] = true;
			utils.navigational[keys['downArrow']] = true;
			utils.navigational[keys['leftArrow']] = true;
			utils.navigational[keys['rightArrow']] = true;

			link.addEventListener('keydown', function(event) {
			  let len = event.target.innerText.trim().length;
			  let hasSelection = false;
			  let selection = window.getSelection();
			  let isSpecial = utils.isSpecial(event);
			  let isNavigational = utils.isNavigational(event);

			  if(link.innerText === ''){
			  	link.innerText = ' ';
			  	console.log('empty');
			  }

			  if (event.keyCode === 13) {
					  event.preventDefault();
					  link.contentEditable = false;
				  }

			  if (selection) {
				hasSelection = !!selection.toString();
			  }

			  if (isSpecial || isNavigational) {
				return true;
			  }



			  if (len >= settings.maxLen && !hasSelection) {
				event.preventDefault();
				return false;
			  }

			});
		}
	}
})();