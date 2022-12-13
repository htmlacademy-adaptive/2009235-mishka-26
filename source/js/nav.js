(() => {
  const noJS = document.querySelector('.main-nav');
  const main_menu = document.querySelector('.main-nav__wrapper');
  const main_button = document.querySelector('.main-nav__toggle');

  if (!main_button) return;

  noJS.classList.remove('main-nav--no-js');

  main_button.addEventListener('click', () => {
    main_menu.classList.toggle('main-nav__wrapper--opened');
    if (main_menu.classList.contains('main-nav__wrapper--opened')) {
      main_menu.classList.remove('main-nav__wrapper--closed');
      }

    else {
      main_menu.classList.add('main-nav__wrapper--closed');
    }

    main_button.classList.toggle('main-nav__toggle--closed');
    main_button.classList.toggle('main-nav__toggle--opened');
  })
})();
