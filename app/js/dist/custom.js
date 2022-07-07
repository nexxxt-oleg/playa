

function animateFrom(elem, direction) {
    direction = direction | 1;

    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("gs_reveal_fromLeft")) {
        x = -200;
        y = 0;
    } else if(elem.classList.contains("gs_reveal_fromRight")) {
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


document.addEventListener('DOMContentLoaded', () => {

    let lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });



    gsap.registerPlugin(ScrollTrigger);

    var reveals = gsap.utils.toArray(".gs_reveal");
    for(var i = 0; i < reveals.length; i++) {
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
    for(var i = 0; i < reveal_img.length; i++) {
        (function () {
            var elem = reveal_img[i];
            ScrollTrigger.create({
                trigger: elem,
                onEnter: function() {
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
                onEnterBack: function() {

                },
                onLeave: function() {  } // assure that the element is hidden when scrolled into view
            });
        })();
    }

});