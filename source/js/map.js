(() => {
  const map = document.querySelector('#map');
  if (!map) return;

  ymaps.ready(init);
  function init() {
    var desktop_width = 1150;
    var tablet_width = 768;

    var myMap = new ymaps.Map('map', {
      center: [59.938788, 30.323126],
      zoom: 16.5,
      controls: []
    });

    myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {
      hintContent: 'Мы тут'
      }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-pin.svg',
      iconImageSize: [67, 101],
      iconImageOffset: [-30, -100]
    });

    myMap.geoObjects.add(myPlacemark);

    start();
    window.addEventListener('resize', start);
    function start() {
      if (document.documentElement.clientWidth >= desktop_width) {
        myMap.setCenter([59.938788, 30.323126], 16,);
      }

      else if (document.documentElement.clientWidth < desktop_width && document.documentElement.clientWidth >= tablet_width) {
        myMap.setCenter([59.938788, 30.323126], 16.5,);
      }

      else {
        myMap.setCenter([59.938788, 30.323126], 17.3,);
      }
    }
  }
})();
