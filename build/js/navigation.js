'use strict';

(function () {
    let url = location.pathname;

    let menu = document.querySelectorAll('.inner-nav a');

    menu.forEach( element => {
        let href = `/${element.getAttribute('href')}`;

        if(href.indexOf(url) !== -1) {

            let li = element.closest('li');

            li.classList.add('inner-active-item');
        }
        // li.classList.remove('inner-active-item');
        // element.addEventListener('click', (event) => {
        //     // event.preventDefault();
        //     let href = element.getAttribute('href');
        //
        //     if(href.indexOf(url) !== -1) {
        //         const target = event.target;
        //         let li = event.target.closest('li');
        //
        //         li.classList.add('inner-active-item');
        //     }
        //
        // });
    })

})();