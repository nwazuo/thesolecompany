let loadingScreen = document.querySelector('.loading-screen');

setTimeout(() => {
	loadingScreen.classList.add('hide');
}, 3000);
//possible performance drawback by playing in background continously?
var animation = bodymovin.loadAnimation({
	container: document.querySelector('.loading-screen__animation'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: '../data_.json',
});

function pageTransitionIn() {
	return gsap.to('.page-transition', {
		duration: 0.5,
		scaleX: 1,
		transformOrigin: 'bottom right',
	});
}

function pageTransitionOut() {
	return gsap.timeline({ delay: 1 }).to('.page-transition', {
		duration: 0.5,
		scaleX: 0,
		skewX: 0,
		transformOrigin: 'top left',
		ease: 'power1.out',
	});
}

barba.init({
	transitions: [
		{
			name: 'say-hi',
			leave() {
				pageTransitionOut();
			},
			enter() {
				pageTransitionIn();
			},
		},
	],
});

class Slide {
	constructor(el) {
		this.el = el;
		this.txt = new TextFx(el);
	}
}

class TextSlide {
	constructor(slideNode) {
		this.slideNode = slideNode;
		this.slideElements = this.slideNode.querySelectorAll('.effect');
		this.elementsFx = Array.from(this.slideElements).map((el) => new Slide(el));
		this.count = this.elementsFx.length;
		this.index = 0;
		this.isPlay;
	}

	//change slide index
	switch() {
		let currentSlide = this.elementsFx[this.index];
		let tempIndex = this.index + 1;
		this.index = tempIndex > this.count - 1 ? 0 : tempIndex;
		let nextSlide = this.elementsFx[this.index];

		var checkEndCnt = 0,
			checkEnd = function () {
				checkEndCnt++;
				if (checkEndCnt === 2) {
					currentSlide.el.classList.remove('slide--current');
					nextSlide.el.classList.add('slide--current');
				}
			};

		currentSlide.txt.hide('fx15', function () {
			currentSlide.el.style.opacity = 0;
			checkEnd();
		});

		nextSlide.txt.hide();
		nextSlide.el.style.opacity = 1;
		nextSlide.txt.show('fx15', function () {
			checkEnd();
		});
	}

	play() {
		this.isPlay = setInterval(() => this.switch(), 2500);
	}

	stop() {
		clearInterval(this.isPlay);
	}
}

let slide = new TextSlide(document.querySelector('.slide'));
slide.play();
