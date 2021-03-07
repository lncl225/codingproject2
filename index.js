!(function(d) {
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
            let newPrev = slide + 2;

            if ((totalItems - 1) > 3) {
                if (newPrev <= 0) {
                    oldPrev = (totalItems - 1);
                }
            }
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
        next.addEventListener('click', movePrev);
    };
}(document));
