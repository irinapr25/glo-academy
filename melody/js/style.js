$(document).ready(function () {// jqDoc - jqDocReady
	console.log('Сайт готов!');// - проверка работает ли JQuery
	let currentFloor = 2;// создаем переменную текущего этажа
	let floorPath = $('.home-image path');//создаем переменную для .home-image path - каждый отдельный этаж в svg
	let counterUp = $('.counter-up'); // переменная отвечающая за Cl по кнопке вверх
	let counterDown = $('.counter-down'); // переменная отвечающая за Cl по кнопке вниз

	// при наведении мышкой на этаж
	floorPath.on('mouseover', function () {// прослушивание/отслеживание наведения мышки на этаж
		floorPath.removeClass('current-floor');// удалять class current-floor, который остался при Cl по кнопкам вверх/вниз
		currentFloor = $(this).attr('data-floor');// получение номера этажа при клике
		$('.counter').text(currentFloor);//вывод номера этажа по которому Cl в счeтчик справа
	})

	//кнопка вверх
	counterUp.on('click', function () { //отслеживаем Cl по кнопке вверх
		if (currentFloor < 18) {//ограничение по кол-ву этажей, чтобы при Cl на стрелку не переходил больше 18 этажа
			currentFloor++;//увеличение на 1
			usCurrentFloor = currentFloor.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});// перевод обычного числа вчисло с добавлением 0 перед числам 2-9
			$('.counter').text(usCurrentFloor);//записывем значение этажа в счетчик
			floorPath.removeClass('current-floor');//удаление/очищение class current-floor
			$(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor');//подсвечивание этажа/добавление class current-floor
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
		}
	})
});
