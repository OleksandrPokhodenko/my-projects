// Строгий режим
"use strict"

window.addEventListener('load', windowLoad)

function windowLoad() {
    document.addEventListener('click', documentActions)
    viewportActive()
    scrollersInit()
    retingSize()
    slidersInit()
}

function documentActions(e) {
    const targetElement = e.target
    const type = e.type

    if (type === 'click') {

        // menu-open
        if (targetElement.closest('.menu-open')) {
            document.documentElement.classList.toggle('open-menu')
        }
        else if (targetElement.closest('.open-menu')) {
            document.documentElement.classList.remove('open-menu')
        }

        // work with spollers
        if (targetElement.closest('summary')) {
            e.preventDefault()

            const spollerTitle = targetElement.closest('summary')
            const spoller = spollerTitle.closest('details')
            const spollerBody = spollerTitle.nextElementSibling


            !spollerBody.hidden ?
                spoller.classList.contains('active') ? setTimeout(() => { spollerBody.hidden = true }, 500) : spollerBody.hidden = true
                : null

            !spoller.open ? spoller.open = true : setTimeout(() => { spoller.open = false }, 500)

            _slideToggle(spollerBody)

            spoller.classList.toggle('active')
        }
    }
}

//working with viewport

function viewportActive() {
    function headerChange() {
        const navHeaderList = document.querySelector('.nav-header__list')
        const actionHeaderBox = document.querySelector('.action-header__box')
        const actionHeaderLink = document.querySelector('.action-header__link')
        const resizeObserverHeader = new ResizeObserver(entries => {
            let liEl = document.createElement('li')
            for (let entry of entries) {
                if (actionHeaderBox && navHeaderList && actionHeaderLink) {
                    if (entry.contentRect.width <= 500) {
                        if (actionHeaderBox.contains(actionHeaderLink)) {
                            actionHeaderBox.removeChild(actionHeaderLink)
                            liEl.insertAdjacentElement("afterbegin", actionHeaderLink)
                            liEl.classList.add('nav-header__item')
                            actionHeaderLink.classList.add('nav-header__link')
                            actionHeaderLink.classList.remove('action-header__link')
                            navHeaderList.insertAdjacentElement("beforeend", liEl)
                        }
                    }
                    else if (entry.contentRect.width > 500) {
                        if (navHeaderList.contains(actionHeaderLink)) {
                            navHeaderList.removeChild(navHeaderList.lastElementChild)
                            actionHeaderBox.insertAdjacentElement("afterbegin", actionHeaderLink)
                            actionHeaderLink.classList.remove('nav-header__link')
                            actionHeaderLink.classList.add('action-header__link')
                        }
                    }
                }
            }
        })
        resizeObserverHeader.observe(document.documentElement)
    }
    headerChange()
    function textWidthChange() {
        const textItems = document.querySelectorAll('.slide__text')
        if (textItems.length) {
            textItems.forEach(textItem => {
                const children = textItem.children
                const childArr = Array.from(children)
                if (childArr.length) {
                    const resizeObserverText = new ResizeObserver(entries => {
                        for (let entry of entries) {
                            if (entry.contentRect.width < 768) {
                                const elWidth = entry.contentRect.width
                                for (let el of childArr) {
                                    el.style.cssText = `max-width: ${(elWidth - 30) / 16}rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;`
                                }
                            }
                            else if (entry.contentRect.width >= 768) {
                                for (let el of childArr) {
                                    el.removeAttribute('style')
                                }
                            }
                        }
                    })
                    resizeObserverText.observe(document.documentElement)
                }
            })
        }
    }
    textWidthChange()
}

//working with scrollers

function scrollersInit() {
    const addScrollers = document.querySelectorAll('.scroller')
    if (addScrollers.length) {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation()
            function addAnimation() {
                addScrollers.forEach(scroller => {
                    scroller.setAttribute('data-animated', true)
                    const scrollerInner = scroller.querySelector('.scroller__inner')
                    const scrollerContent = Array.from(scrollerInner.children)
                    scrollerContent.forEach(item => {
                        const duplicateItem = item.cloneNode(true)
                        duplicateItem.setAttribute('aria-hidden', true)
                        scrollerInner.appendChild(duplicateItem)
                    })
                })
            }
        }
    }
}

// Допоміжні модулі плавного розкриття та закриття об'єкта ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty('height') : null;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            !showmore ? target.style.removeProperty('overflow') : null;
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // Створюємо подію 
            document.dispatchEvent(new CustomEvent("slideUpDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.hidden = target.hidden ? false : null;
        showmore ? target.style.removeProperty('height') : null;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // Створюємо подію
            document.dispatchEvent(new CustomEvent("slideDownDone", {
                detail: {
                    target: target
                }
            }));
        }, duration);
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}

function retingSize() {
    const items = document.querySelectorAll('.reting__yellow')
    const itemParent = document.querySelector('.reting')
    if (items.length && itemParent) {
        items.forEach(item => {
            const itemParentWidth = itemParent.getBoundingClientRect().width
            const itemValueFloat = parseFloat(item.getAttribute('data-value'))
            const itemValueInt = parseInt(item.getAttribute('data-value'))
            const itemStyles = window.getComputedStyle(item)
            const itemGap = parseFloat(itemStyles.getPropertyValue('gap'))
            const itemChild = item.children[0]
            const itemChildStyles = window.getComputedStyle(itemChild)
            const itemChildWidth = parseFloat(itemChildStyles.getPropertyValue('width'))
            let itemWidth
            if (Number.isInteger(itemValueFloat) && itemValueInt > 0) {
                itemWidth = (itemValueInt * itemChildWidth) + ((itemValueInt - 1) * itemGap)
            }
            else if (!Number.isInteger(itemValueFloat)) {
                itemWidth = (itemValueInt * itemChildWidth) + ((itemValueInt - 1) * itemGap) + ((itemValueFloat - itemValueInt) * itemChildWidth) + itemGap
            }
            const itemWidthPercent = itemWidth / itemParentWidth * 100
            item.style.width = `${itemWidthPercent}%`
            if (itemValueInt === 0) {
                item.style.width = 0
            }
        })
    }
}

function slidersInit() {
    const swiper = new Swiper('.what-customes-say-section__slider', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoHeight: true,
        speed: 300,
        effect: 'fade',
        autoplay: true,
        fadeEffect: {
            crossFade: true
        },

        // If we need pagination
        pagination: {
            el: '.what-customes-say-section__pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'bullets__item',
            bulletActiveClass: 'bullets__item--active',
        },
        slidesPerGroup: 1,
        slidesPerView: 1,
    })
}