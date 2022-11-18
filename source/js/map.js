(() => {
  const map = document.querySelector('#map');
  if (!map) return;

  ymaps.ready(init);
  function init() {
    var desktop_width = 1280;
    var tablet_width = 768;

    var myMap = new ymaps.Map('map', {
      center: [59.938635, 30.323118],
      zoom: 15,
      controls: []
    });

    myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {
      hintContent: 'Мы тут'
      }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-marker@2x.png',
      iconImageSize: [113, 106],
      iconImageOffset: [-50, -106]
    });

    myMap.geoObjects.add(myPlacemark);

    start();
    window.addEventListener('resize', start);
    function start() {
      if (document.documentElement.clientWidth >= desktop_width) {
        myMap.setCenter([59.938802, 30.319973], 16,);
        myPlacemark.options.set({
          iconImageSize: [113, 106],
          iconImageOffset: [-50, -106]
        });
      }

      else if (document.documentElement.clientWidth < desktop_width && document.documentElement.clientWidth >= tablet_width) {
        myMap.setCenter([59.938635, 30.323118], 15,);
        myPlacemark.options.set({
          iconImageSize: [113, 106],
          iconImageOffset: [-50, -106]
        });
      }

      else {
        myMap.setCenter([59.938635, 30.323118], 14,);
        myPlacemark.options.set({
          iconImageSize: [57, 53],
          iconImageOffset: [-25, -50]
        });
      }
    }
  }
})();
