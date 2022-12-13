//Проверка формы

(() => {
  const input_required = document.querySelectorAll('.input[required]');
  const button_submit = document.querySelector('.button[type="submit"]');

  if (!input_required.length) return;

  button_submit.addEventListener('click', () => {
    input_required.forEach((input) => {
      if (input.value == '') {
        input.classList.add('input--invalid');
      }
      else {
        input.classList.remove('input--invalid');
      }
    })
  });

  input_required.forEach((input) => {
    input.addEventListener('change', () => {
      if (input.validity.valid) {
        input.classList.remove('input--invalid');
      }
    })
  })
})();
