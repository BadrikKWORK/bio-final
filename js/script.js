const interleaveOffset = 0.95;

var swiper = new Swiper('.main-slider .swiper-container', {
	direction: 'vertical',
  // horizontal slider
  // direction: 'horizontal', 
	speed: 800,
	mousewheelControl: true,
	watchSlidesProgress: true,
	noSwiping: true,
	noSwipingClass: 'swiper-no-swiping',
	mousewheel: {
		// releaseOnEdges: true,
	},
	parallax:true,
	navigation: {
		nextEl: '.main-slider .swiper-button-next',
		prevEl: '.main-slider .swiper-button-prev',
	},
	// scrollbar: {
	// 	el: '.main-slider .swiper-scrollbar',
	// 	draggable: true,
	// },
	pagination: {
		el: '.main-slider .swiper-pagination',
		clickable: true,
		type: 'bullets',
		renderBullet: function (index, className) {
			if (index < 9) {
				return '<span class="' + className + '"' + "val="+`${(index + 1)}` + ' >' +(index + 1) + '</span>';
			}
			else {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			}
		}
	}, 
	on: {
		progress: function () {
			let swiper = this;

			for (let i = 0; i < swiper.slides.length; i++) {
				let slideProgress = swiper.slides[i].progress;
				let innerOffset = swiper.height * interleaveOffset;
				let innerTranslate = slideProgress * innerOffset;

				TweenMax.set(swiper.slides[i].querySelector(".main-slider__inner"), {
					y: innerTranslate,
          // horizontal slider
          // x: innerTranslate, 
				});
			}
		},
		setTransition: function (slider, speed) {
			let swiper = this;
			for (let i = 0; i < swiper.slides.length; i++) {
				swiper.slides[i].style.transition = speed + "ms";
				swiper.slides[i].querySelector(".main-slider__inner").style.transition =
					speed + "ms";
			}
		}
	}
});




window.addEventListener('mousewheel', wheel);
window.addEventListener('DOMMouseScroll', wheel);


// скролл меню до якоря
let swiperMenu = document.querySelectorAll('.header__content nav ul li');
swiperMenu.forEach(element => {
	element.addEventListener("click", function(e) {
		let num = element.getAttribute('data-index');
	
		swiper.slideTo(num);
	});
});
swiper.on('reachEnd', function () {
	setTimeout(function () {
		swiper.mousewheel.disable();
	}, 500);
});
function wheel(event) {
	var delta = 0;
	if (!event) event = window.event;
	if (event.wheelDelta) {
		delta = event.wheelDelta / 120;
	} else if (event.detail) {
		delta = -event.detail / 3;
	}
	if (delta) {
		if (delta > 0) {
			swiper.mousewheel.enable();
		}
	}
}



// //Меню вылезает при загрзуке страницы, после уползает
// let headerContent = document.querySelector('.header__content');

// document.addEventListener("DOMContentLoaded", function() {

// 		headerContent.style.transform = 'translate(0%, 80px)';
		
	

// 	function times(){
// 		headerContent.style.transform = '';
		
// 	}

// 	setTimeout(times,2000);
//   });



let menuCont = document.querySelector('.header__content');
let menuMobl= document.querySelector('.header__menu');
menuMobl.addEventListener("click", function(e) {
	menuCont.classList.toggle('active');
	menuMobl.classList.toggle('active');
});






//Функция для копирования текста в буфер обмена
function copyToClipboard(str,elem) {
	var area = document.createElement('textarea');
	
	document.body.appendChild(area);
	area.value = str;
	area.select();
	document.execCommand("copy");
	document.body.removeChild(area);


	
	if(elem.classList.contains('copy')){
		elem.classList.add('active');
		if(elem.classList.contains('active')){
			popap.classList.add('active');
			popap.style.display = 'flex';
		}
	}

   }
   
 
   //Получаем наш тестовый элемент с текстом
   let test = document.querySelectorAll('p.test');

   let popap = document.querySelector('.popap');
   let close = document.querySelector('.popap__close');
close.addEventListener("click", function(e) {
	popap.style.display = 'none';
});
	test.forEach(element => {
		element.addEventListener('click', ()=>{
			copyToClipboard(element.innerHTML,element)
		})
	});
   //Вешаем на элемент событие. Код будет выполняться после нажатия 


