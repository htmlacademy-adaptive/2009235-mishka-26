(() => {
  const manufacturing_title = document.querySelectorAll('.manufacturing__title');
  const parent_mobile = document.querySelectorAll('.manufacturing__item');
  const parent_tablet = document.querySelectorAll('.manufacturing__info-wrapper');

  if (!manufacturing_title.length || !parent_mobile.length) return;
  var tablet_width = 768;

  for (let i = 0; i <= manufacturing_title.length - 1; i++) {
    const origin_title = manufacturing_title[i].innerHTML;
    const origin_class = manufacturing_title[i].className;
    const origin_teg = manufacturing_title[i].localName;

    const new_title = document.createElement(origin_teg);
    new_title.classList.add(origin_class);
    new_title.innerHTML = origin_title;

    start();
    window.addEventListener('resize', start);
    function start() {
      manufacturing_title.forEach((title) => {
        if (document.documentElement.clientWidth < tablet_width) {
          title.remove();
          parent_mobile[i].appendChild(new_title);
        }

        else {
          title.remove();
          parent_tablet[i].appendChild(new_title);
        }
      })
    }
  }
})();
