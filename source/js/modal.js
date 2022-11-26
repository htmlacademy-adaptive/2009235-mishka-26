(() => {
  const modal_open_buttons = document.querySelectorAll('#modal-size-button');
  const modal_window = document.querySelector('.modal');

  if (!modal_open_buttons.length) return;

  modal_open_buttons.forEach((button) => {         
    button.addEventListener('click', () => {
        modal_window.classList.remove('modal--close');
    })
  })
})();
