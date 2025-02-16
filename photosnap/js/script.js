// Строгий режим
"use strict"

let documentActions = (e) => {
    const targetElement = e.target

    if (targetElement.closest('.open-menu')) {
        document.documentElement.classList.toggle('menu-open')
    }
    else if (targetElement.closest('.menu-open')) {
        document.documentElement.classList.remove('menu-open')
    }
}

document.addEventListener('click', documentActions)

const buttonContainer = document.querySelector('.action-header')

const navContainer = document.querySelector('.header__nav')

const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        if (entry.target === document.documentElement && buttonContainer && navContainer) {
            const headerContainer = document.querySelector('.header__container')
            if (headerContainer && buttonContainer.closest('.header__container')) {
                buttonContainer.remove()
                const position = entry.contentRect.width <= 670 ? "beforeend" : "afterend"
                navContainer.insertAdjacentElement(position, buttonContainer)
            }
        }
    }
})

resizeObserver.observe(document.documentElement)
