function animateFrom(elem, direction) {
    direction = direction | 1;

    var x = 0,
        y = direction * 100;
    if (elem.classList.contains("gs_reveal_fromLeft")) {
        x = -200;
        y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 200;
        y = 0;
    }
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        /*overwrite: "auto"*/
    });
}

function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
}


function activeMenu() {
    gsap.fromTo(".playa__header__nav__item", {y: 100, autoAlpha: 0},
        {
            autoAlpha: 1,
            ease: "power2.inOut",
            y: 0,
            delay: 0.4,
            stagger: 0.1
        });
}

document.addEventListener('DOMContentLoaded', () => {

    let lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });

    if (window.screen.width > 990) {
        gsap.registerPlugin(ScrollTrigger);

        var reveals = gsap.utils.toArray(".gs_reveal");
        for (var i = 0; i < reveals.length; i++) {
            (function () {
                var elem = reveals[i];


                hide(elem); // assure that the element is hidden when scrolled into view

                ScrollTrigger.create({
                    trigger: elem,
                    toggleClass: "active",
                    onEnter: function () {
                        animateFrom(elem)
                    },
                    onEnterBack: function () {
                        //animateFrom(elem, -1)
                    },
                    onLeave: function () {
                    } // assure that the element is hidden when scrolled into view
                });

            })();
        }

        var reveal_img = gsap.utils.toArray(".gs_reveal_img");
        for (var i = 0; i < reveal_img.length; i++) {
            (function () {
                var elem = reveal_img[i];
                ScrollTrigger.create({
                    trigger: elem,
                    onEnter: function () {
                        gsap.to(elem, {
                            duration: 1,
                            delay: 0.5,
                            scale: 1.05,
                            ease: "sine.inOut"
                        });

                        gsap.to(elem, {
                            duration: 1,
                            delay: 1.6,
                            scale: 1,
                            ease: "circ.inOut"
                        });

                    },
                    onEnterBack: function () {

                    },
                    onLeave: function () {
                    } // assure that the element is hidden when scrolled into view
                });
            })();
        }
    }


    document.getElementById('menuToggle').addEventListener('click', () => {
        document.body.classList.toggle("menu-active")
        if (document.body.classList.contains("menu-active")) {
            activeMenu();
        }
    });

    IMask(document.getElementById('inpTel'), {
        mask: '+{7}(000)000-00-00',
        lazy: true
    });

    IMask(document.getElementById('inpTime'), {
        mask: '00:00',
        lazy: true
    });

    validate.init({
        messageValueMissing: 'Пожалуйста, заполните это поле.',
        messageValueMissingCheckbox: 'Пожалуйста, заполните это поле.',
        disableSubmit: true,
        onSubmit: function (form, fields) {
            console.log(fields);
        }
    });


    new AirDatepicker('#inpDate', {

    });

    var collapceClick = false;
    if(!collapceClick) {
        window.onscroll = function () {
            //console.log(window.pageYOffset);

            let activeBox = document.getElementById('collapseMenu1');
            let activeBoxImg = activeBox.getElementsByClassName('playa__menu__img')
            if(activeBox.getBoundingClientRect().top < -30) {
                activeBoxImg[0].style.top = activeBox.getBoundingClientRect().top * (-1) + 'px';
            } else {
                activeBoxImg[0].style.top = '50px';
            }

        }
    }


    var collapseElementList = Array.prototype.slice.call(document.querySelectorAll('.playa__menu__body'))
    collapseElementList.map(function (collapseEl) {
        collapseEl.addEventListener('show.bs.collapse', function () {
            window.onscroll = function () {
                //console.log(window.pageYOffset);

                let activeBox = document.getElementById(collapseEl.id);
                let activeBoxImg = activeBox.getElementsByClassName('playa__menu__img')
                if(activeBox.getBoundingClientRect().top < -30) {
                    activeBoxImg[0].style.top = activeBox.getBoundingClientRect().top * (-1) + 'px';
                } else {
                    activeBoxImg[0].style.top = '50px';
                }

            }
            console.log(collapceClick);
            collapceClick = true;
        });

        collapseEl.addEventListener('hidden.bs.collapse', function () {
            document.getElementById(collapseEl.id)
                .getElementsByClassName('playa__menu__img')[0].style.top = '50px';
        });
    })


});
