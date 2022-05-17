// Функция, выполняемая после загрузки DOM
 var myMap;
 ymaps.ready(init)
 $( document ).ready(function() {
    let key = '9614e577db334233a7940812221105';
    let citys = ['Vladikavkaz', 'Beslan', 'Alagir', 'Ardon', 'Digora', 'Mozdok'];
    // AJAX-запрос к серверу API
    citys.forEach(city => {
        let url = 'http://api.weatherapi.com/v1/current.json?key='+key+'&q='+city+'&aqi=no';
        $.get( url, function( json ) {
            console.log(json);
            ymaps.ready(function () {
                    // Создаём макет содержимого.
                    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                    ),
                    
                        myPlacemarkWithContent = new ymaps.Placemark([json.location.lat, json.location.lon], {
                            hintContent: json.current.temp_c,
                        }, {
                            // Опции.
                            // Необходимо указать данный тип макета.
                            iconLayout: 'default#imageWithContent',
                            // Своё изображение иконки метки.
                            iconImageHref: 'http:'+json.current.condition.icon,
                            // Размеры метки.
                            iconImageSize: [48, 48],
                            // Смещение левого верхнего угла иконки относительно
                            // её "ножки" (точки привязки).
                            iconImageOffset: [-24, -24],
                            // Смещение слоя с содержимым относительно слоя с картинкой.
                            iconContentOffset: [15, 15],
                            // Макет содержимого.
                            iconContentLayout: MyIconContentLayout
                        });
                
                        myMap.geoObjects.add(myPlacemarkWithContent);
                    
            });
        }); 
    });

});

function init () {
    myMap = new ymaps.Map('map', {
        center: [43.04, 44.68],
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });
}
