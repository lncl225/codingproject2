const MODAL_CONTENT = {
    AtoE: {
        copy: 'A is for ant',
        image: 'https://place-puppy.com/1920x1024'
    },
    FtoK: {
        copy: 'F is for ant',
        image: ''
    },
    LtoO: {
        copy: 'L is for ant',
        image: ''
    },
    PtoU: {
        copy: 'P is for ant',
        image: ''
    },
    VtoZ: {
        copy: 'V is for ant',
        image: ''
    }
};

const getContent = letters => {
    if (['abcde'].includes(letters[1])) {
        return MODAL_CONTENT.AtoL
    } else if (['ghijk'].includes(letters[1])) {
        return MODAL_CONTENT.FtoK
    } else if (['lmno'].includes(letters[1])) {
        return MODAL_CONTENT.LtoO
    } else if (['pqrstu'].includes(letters[1])) {
        return MODAL_CONTENT.PtoU
    } else {
        return MODAL_CONTENT.VtoZ
    }
}

!(function(d) {
    // Image Carousel
    const itemClassName = 'carousel__photo';
    const items = d.getElementsByClassName(itemClassName);
    const totalItems = items.length;
    let slide = 0;
    let moving = true;

    const disableInteraction = () => {
        moving = true;
        setTimeout(() => {
            moving = false
        }, 500);
    };

    const moveCarouselTo = slide => {
        if (!moving) {
            disableInteraction();
            let newPrev = slide - 1;
            let newNext = slide + 1;
            let oldPrev = slide - 2;
            let oldNext = slide + 2;

            if ((totalItems - 1) > 3) {
                if (newPrev <= 0) {
                    oldPrev = (totalItems - 1);
                } else if (newNext >= (totalItems - 1)) {
                    oldNext = 0;
                }
            }

            if (slide === 0) {
                newPrev = (totalItems - 1);
                oldPrev = (totalItems - 2);
                oldNext = (slide + 1);
            } else if (slide === (totalItems - 1)) {
                newPrev = (slide - 1);
                newNext = 0;
                oldNext = 1;
            }
            
            items[oldPrev].className = itemClassName;
            items[oldNext].className = itemClassName;
            items[newPrev].className = itemClassName + " prev";
            items[slide].className = itemClassName + " active";
            items[newNext].className = itemClassName + " next";
        }
    };

    const moveNext = () => {
        if (!moving) {
            if (slide === (totalItems - 1)) {
                slide = 0;
            } else {
                slide++;
            }
        }

        moveCarouselTo(slide);
    };

    const movePrev = () => {
        if (!moving) {
            if (slide === 0) {
                slide = (totalItems - 1)
            } else {
                slide--
            }
        }

        moveCarouselTo(slide);
    }

    const setInitialClasses = () => {
        items[totalItems - 1].classList.add('prev');
        items[0].classList.add('active');
        items[1].classList.add('next');
    };

    const setEventListeners = () => {
        const next = d.getElementsByClassName('carousel__button--next')[0];
        const prev = d.getElementsByClassName('carousel__button--prev')[0];

        next.addEventListener('click', moveNext);
        prev.addEventListener('click', movePrev);
    };

    const initCarousel = () => {
        setInitialClasses();
        setEventListeners();
        moving = false;
    };

    initCarousel();

    // Modal
    const modal = document.querySelector(".modal");
    const modalContent= document.querySelector(".modal-copy");
    const modalImage = document.querySelector('.modal-image');
    const modalOverlay = document.querySelector(".overlay");
    const closeButton = document.querySelector(".close-button");
    const cards = document.querySelectorAll(".card");

    closeButton.addEventListener("click", function() {
        modal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
    });

    cards.forEach(card => {
        card.addEventListener("click", function() {
            const content = getContent(card.innerHTML);
            modal.classList.toggle("closed");
            modalOverlay.classList.toggle("closed");
            modalContent.innerHTML = content.copy;
            // modalImage.setAttribute('src', content.image);
            console.log(modalImage)
        });
    });

    // Scroll to top Button
    const scrollButton = document.getElementById("scroll-button");
    
    scrollFunction = () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    }
    document.addEventListener('scroll', scrollFunction);

    topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    
    scrollButton.addEventListener('click', topFunction);
}(document));
