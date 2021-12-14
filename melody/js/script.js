$(document).ready(function () {// jqDoc - jqDocReady
	console.log('Сайт готов!');// - проверка работает ли JQuery
	let currentFloor = 2;// создаем переменную текущего этажа
	let floorPath = $('.home-image path');//создаем переменную для .home-image path - каждый отдельный этаж в svg
	let counterUp = $('.counter-up'); // переменная отвечающая за Cl по кнопке вверх
	let counterDown = $('.counter-down'); // переменная отвечающая за Cl по кнопке вниз

	let modal = $('.modal'); //модальное окно
	let modalCloseButton = $('.modal-close-btn');//кнопка закрытия модального окна
	let viewFlatsButton = $('.view-flats');//кнопка "Смотреть квартиры на этаже"


	// при наведении мышкой на этаж
	floorPath.on('mouseover', function () {// прослушивание/отслеживание наведения мышки на этаж
		floorPath.removeClass('current-floor');// удалять class current-floor, который остался при Cl по кнопкам вверх/вниз
		currentFloor = $(this).attr('data-floor');// получение номера этажа при клике
		$('.counter').text(currentFloor);//вывод номера этажа по которому Cl в счeтчик справа
		$('.flat-number').text(+currentFloor);
	})

/* Квартиры ---------------------------------------------------------- */
/* логика - когда мы наводим на квартику к элементу списка квартир li добавляем class="current-flat"
когда наводим на квартиру в списке - квартире на плане добавляем class="current-list-elem"*/

	let flatPath = $('.flats path');//каждая отдельная квартира
	let listPath = $('.flat-item a');//данные по каждой квартире список li

	// при наведении мышкой на квартиру
	flatPath.on('mouseover', function () {
		let currentFlat = $(this).attr('data-flat');// получаем номер квартиры при наведении

		// поставить выделение правой секции для активного элемента
		let selectedFlat = $(`[data-flat-link=${currentFlat}]`);
		selectedFlat.toggleClass('current-flat');//добавление class current-flat к li
	})
	//снять выделение с элемента списка
	flatPath.on("mouseout", function () {
		$(`[data-flat-link]`).removeClass('current-flat');
	});

	// mouseover list elem function
	listPath.on("mouseover", function () {
		let currentListElem = $(this).attr('data-flat-link');

		// поставить выделение квартиры при наведении на список квартир
		let selectedListElem = $(`[data-flat=${currentListElem}]`);
		selectedListElem.toggleClass("current-list-elem");
	});

	//снять выделение с плнаквартиры
	listPath.on("mouseout", function () {
		$(`[data-flat]`).removeClass('current-list-elem');
	});

/* ---------------------------------------------------------- */
	floorPath.on('click', toggleModal);// при Cl на этаж будет появляться модальное окно (т.к. добавиться class is-open)
	modalCloseButton.on('click', toggleModal);// при Cl на кнопку закрыть закрывает окно
	viewFlatsButton.on('click', toggleModal);// при Cl на кнопку "Смотреть квартиры на этаже" откроется модальное окно

	//кнопка вверх
	counterUp.on('click', function () { //отслеживаем Cl по кнопке вверх
		if (currentFloor < 18) {//ограничение по кол-ву этажей, чтобы при Cl на стрелку не переходил больше 18 этажа
			currentFloor++;//увеличение на 1
			usCurrentFloor = currentFloor.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});// перевод обычного числа вчисло с добавлением 0 перед числам 2-9
			$('.counter').text(usCurrentFloor);//записывем значение этажа в счетчик
			floorPath.removeClass('current-floor');//удаление/очищение class current-floor
			$(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor');//подсвечивание этажа/добавление class current-floor
			$('.flat-number').text(currentFloor);
		}
	})

	//кнопка вниз
	counterDown.on('click', function () {
		if (currentFloor > 2) {//если номер этажа больше 2
			currentFloor--;
			usCurrentFloor = currentFloor.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
			$('.counter').text(usCurrentFloor);
			floorPath.removeClass('current-floor');
			$(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor');
			$('.flat-number').text(currentFloor);
		}
	})

	function toggleModal() {// ф-ция открыть/закрыть окно
		modal.toggleClass('is-open');
	}
});
