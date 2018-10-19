(function () {
	var URLload = 'http://madrabit.mhost.ru/general.json';

	window.load = function (onLoad, onError) {

		// function onLoad (data) {
		// 	return data;
		// }

		// function onError (message) {
		// 	console.error(message);
		// }

		var xhr = new XMLHttpRequest();
		xhr.reponseType = 'json';

		xhr.open('GET', URLload);

		xhr.addEventListener('load', function (){
			if (xhr.status == 200) {
				var returnedData = JSON.parse(xhr.response);
				onLoad(returnedData);
				return returnedData;

			} else {
				onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
			}

		});

		xhr.addEventListener('error', function (){
			onError('Произошла ошибка соединения');
		});

		xhr.addEventListener('timeout', function (){
			onError('Запрос не успел выполниться за ' + xhr.timeout + 'mc');
		});

		xhr.timeout = 10000;

		xhr.send();
	}
	var globalData;
	window.reload = function () {

		// function onLoad (data) {
		// 	return data;
		// }

		// function onError (message) {
		// 	console.error(message);
		// }

		var xhr = new XMLHttpRequest();
		xhr.reponseType = 'json';

		xhr.open('GET', URLload);
		var returnedData;

		xhr.addEventListener('load', function (){
			if (xhr.status == 200) {
				returnedData = JSON.parse(xhr.response);

				// return returnedData;


			}

		});



		xhr.timeout = 10000;

		xhr.send();

		globalData = returnedData;

		return globalData;

	}



	var URLupload = 'http://madrabit.mhost.ru/save_json.php';

	window.upload = function (data, onSuccess, onError) {
		// function onLoad (data) {
		// 	return data;
		// }

		function onError (message) {
			console.error(message);
		}

		var xhr = new XMLHttpRequest();

		xhr.reponseType = 'json';

		xhr.addEventListener('load'	, function () {

			if (xhr.status != 200) {
				console.log('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);


			} else {
				onSuccess(xhr.response);
				// onSuccess(data);
				// return data;
			}

		});


		xhr.addEventListener('error', function (){
			onError(console.log('Произошла ошибка соединения'));
		});

		xhr.addEventListener('timeout', function (){
			onError('Запрос не успел выполниться за ' + xhr.timeout + 'mc');
		});

		// xhr.open('POST', URLupload)
		xhr.open('POST', URLupload)
		// xhr.setRequestHeader('Content-Type', 'application/json');


		xhr.timeout = 10000;

		xhr.send(data);
	}
})();