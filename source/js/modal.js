(() => {
  const modal_open_buttons = document.querySelectorAll('#modal-size-button');
  const modal_window = document.querySelector('.modal');

  if (!modal_open_buttons.length) return;

  function openModal(modal) {
    modal.classList.remove('modal--close');
    document.addEventListener('keydown', closeByEscape);
  }

  function closeModal(modal) {
    modal.classList.add('modal--close');
    document.removeEventListener('keydown', closeByEscape);
  }

  modal_open_buttons.forEach((button) => {
    button.addEventListener('click', () => {
      openModal(modal_window);
    })
  })

  modal_window.addEventListener('click', function (e) {
    if (!modal_window.classList.contains('modal--close') && e.target == e.currentTarget) {
      closeModal(modal_window);
    }
  });

  function closeByEscape(e) {
    if (!modal_window.classList.contains('modal--close') && e.key === 'Escape') {
      closeModal(modal_window);
    }
  }
})();
