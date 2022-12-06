(() => {
  const manufacturing_title = document.querySelectorAll('.manufacturing__title');

  if (!manufacturing_title.length) return;
  var tablet_width = 768;

  /*const parent_tablet = manufacturing_title.parentElement;
  const parent_mobile = manufacturing_title.parentElement;
  console.log(parent_mobile);*/

  for (let i = 0; i <= manufacturing_title.length - 1; i++) {
    const origin_title = manufacturing_title[i].innerHTML;
    const origin_class = manufacturing_title[i].className;
    const origin_teg = manufacturing_title[i].localName;

    const new_title = document.createElement(origin_teg);
    new_title.classList.add(origin_class);
    new_title.innerHTML = origin_title;
    console.log(new_title);



    start();
    window.addEventListener('resize', start);
    function start() {
      let parent_tablet = manufacturing_title.parentElement;
      let parent_mobile = manufacturing_title.parentElement;

      manufacturing_title.forEach((title) => {
        if (document.documentElement.clientWidth < tablet_width) {
          //let parent = title.parentElement.parentElement;
          //parent.insertBefore(new_title, parent.FirstChild);
          parent_mobile.appendChild(new_title);
          parent_tablet.remove();
        }

        else {
          //let parent = title.parentElement;
          parent_tablet.appendChild(new_title);
          parent_mobile.remove();
          //title.remove();
        }
      })
    }
  }
})();
