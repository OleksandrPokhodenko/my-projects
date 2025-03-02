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

document.addEventListener("DOMContentLoaded", () => {
    const buttonChoice = document.querySelector('.box-button__button')
    const buttonChoices = document.querySelectorAll('.box-button__choice')
    const priceElements = document.querySelectorAll('.box-articles__body')

    const tariffPlansObject = {
        Basic: {
            Monthly: '$19.00',
            Yearly: '$190.00',
        },
        Pro: {
            Monthly: '$39.00',
            Yearly: '$390.00',
        },
        Business: {
            Monthly: '$99.00',
            Yearly: '$990.00',
        },
    }

    let plan = localStorage.getItem('plan') || 'Monthly'

    function updatePricing() {
        priceElements.forEach(article => {
            const planName = article.getAttribute('data-plan')
            const planValue = article.querySelector('.box-articles__price')
            const planTariff = article.querySelector('.box-articles__pricing-plan')

            if (tariffPlansObject[planName]) {
                planValue.classList.add('fade-out')
                planTariff.classList.add('fade-out')

                setTimeout(() => {
                    planValue.textContent = tariffPlansObject[planName][plan]
                    planTariff.textContent = plan === 'Monthly' ? 'per month' : 'per year'

                    planValue.classList.remove('fade-out')
                    planTariff.classList.remove('fade-out')

                    planValue.classList.add('fade-in')
                    planTariff.classList.add('fade-in')
                }, 200)
            }
        })
    }

    if (buttonChoice && buttonChoices.length > 0) {
        buttonChoice.addEventListener('click', () => {
            buttonChoice.classList.toggle('box-button__button--right')

            buttonChoices.forEach(choice => choice.classList.toggle('active'))

            const activeChoice = document.querySelector('.box-button__choice.active')
            plan = activeChoice ? activeChoice.innerText : 'Monthly'
            updatePricing()
        })
    }
})









