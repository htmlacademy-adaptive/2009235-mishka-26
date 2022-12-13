(() => {
  const heder_menu = document.querySelectorAll('.main-nav__list.site-list a');
  const introduction_menu = document.querySelectorAll('.hero__site-list a');

  if (!heder_menu||!introduction_menu) return;

  var desktop_width = 1150;
  var tablet_width = 768;

  for (let i = 0; i <= heder_menu.length - 1; i++) {
    const origin_innerHTML = introduction_menu[i].innerHTML;
    const origin_href = introduction_menu[i].href;

    start();
    window.addEventListener('resize', start);
    function start() {
      if (document.documentElement.clientWidth < desktop_width && document.documentElement.clientWidth >= tablet_width) {
        introduction_menu[i].innerHTML = heder_menu[i].innerHTML;
        introduction_menu[i].href = heder_menu[i].href;
      }

      else {
        introduction_menu[i].innerHTML = origin_innerHTML;
        introduction_menu[i].href = origin_href;
      }
    }
  }
})();
