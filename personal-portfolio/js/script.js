
let documentActions = (e) => {
	const targetElement = e.target

	if (targetElement.closest('.menu-burger')) {
		document.documentElement.classList.toggle('open-menu')
	}
	else if (targetElement.closest('.open-menu')) {
		document.documentElement.classList.remove('open-menu')
	}
}

document.addEventListener('click', documentActions)

function sliderInit() {
	const swiperBlog = new Swiper('.blog-section__swiper', {
		// Optional parameters
		direction: 'horizontal',

		// If we need pagination
		pagination: {
			el: '.blog-section__bullets',
			clickable: true,
			bulletClass: 'bullets__item',
			bulletActiveClass: 'bullets__item--active',
		},
		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerGroup: 1,
				slidesPerView: 1.5,
				spaceBetween: 20
			},
			// when window width is >= 450px
			450: {
				slidesPerGroup: 2,
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is >= 670px
			670: {
				slidesPerGroup: 3,
				slidesPerView: 3,
				spaceBetween: 20
			},
			// when window width is >= 950px
			950: {
				slidesPerGroup: 4,
				slidesPerView: 4,
				spaceBetween: 24
			},
		}
	})

	const swiperTestimonial = new Swiper('.testimonial-section__swiper', {
		// Optional parameters
		direction: 'horizontal',
		loop: true,

		// If we need pagination
		pagination: {
			el: '.testimonial-section__bullets',
			clickable: true,
			bulletClass: 'bullets__item',
			bulletActiveClass: 'bullets__item--active',
		},
		slidesPerGroup: 1,
		slidesPerView: 1,
	})
}

window.addEventListener('load', sliderInit)


