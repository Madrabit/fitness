let form = document.querySelector('.sing-up-form');
let email = document.querySelector('#login-email');
let password = document.querySelector('.sing-password');
let confirm = document.querySelector('.sing-confirm');
let passTooltip = document.querySelector('.sing-tooltip-pass');

form.addEventListener('submit', e => {

	CheckAvailability();

	if (password.value !== confirm.value) {
		console.log('Пароли  не совпадают. Пожалуйста, проверьте  идентичность паролей в обоих полях');
		passTooltip.classList.remove('sing-tooltip-pass--hidden');
		// passTooltip.classList.add('.sing-tooltip-pass--visible')
		e.preventDefault();
	}



});

document.addEventListener('click', ()=> {
	if (!(passTooltip.classList.contains('sing-tooltip-pass--hidden'))) {
		passTooltip.classList.add('sing-tooltip-pass--hidden')
	}
});


let CheckAvailability = function() {

	let username = email.value;
	let request;

	request = new XMLHttpRequest();

	if (request != null) {

		// TODO Поставить URL где будет проверяться на бэкенде
		let url = "Default.py/CheckUserName";

		request.open("POST", url, false);
		let sendStr = "{username: '" + username + "'}";
		request.setRequestHeader("Content-Type", "application/json");

		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {

				// Заменить объект email на tooltip для проверки мэйла
				if (JSON.parse(request.responseText).d) {

					email.style.color = "green";
					email.innerHTML = "Username is available";
				}
			   else {

					email.style.color = "red";
					email.innerHTML = "Username is NOT available";
				}
			}
		};
		request.send(sendStr);
	}

}

