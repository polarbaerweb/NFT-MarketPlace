const scrollbarTrack = document.querySelector(".main__scrollbar-track");
const scrollbarThumb = document.querySelector(".main__scrollbar-thumb");
const main__container = document.querySelector( ".main__container" );
const spiderweb = document.querySelector( ".spiderweb" )
const spider_web_height = parseInt(getComputedStyle(spiderweb).height)
const body = document.querySelector( ".body" )
const message = document.querySelector(".message")

main__container.addEventListener("scroll", () => {
	const scrollPercentage = (main__container.scrollTop / (main__container.scrollHeight - main__container.clientHeight)) * 100;
	const thumbPosition =(scrollbarTrack.clientHeight - scrollbarThumb.clientHeight) * (scrollPercentage / 100);

	scrollbarThumb.style.transform = `translateY(${ thumbPosition }px)`;
	spiderweb.style.height = ((thumbPosition * 10) / 100 ) + spider_web_height + "px"
} );

spiderweb.addEventListener("mousedown", (e) => {
	e.preventDefault();

	const startY = e.clientY;
	const thumbStartY = scrollbarThumb.getBoundingClientRect().top;
	var audio = new Audio("./files/audio/scream.mp3")

	document.addEventListener("mousemove", onMouseMove);
	document.addEventListener( "mouseup", onMouseUp );
	
	spiderweb.classList.add( "enscrolled" )
	body.classList.add( "enscrolled" )
	audio.play()

	function onMouseMove(e) {
		const deltaY = e.clientY - startY;
		const thumbY = thumbStartY + deltaY;

		if (thumbY >= 0 && thumbY <= scrollbarTrack.clientHeight - scrollbarThumb.clientHeight) {
		const scrollPercentage = (thumbY / (scrollbarTrack.clientHeight - scrollbarThumb.clientHeight)) * 100;
		const scrollPosition = (scrollPercentage / 100) * (main__container.scrollHeight - main__container.clientHeight);

		scrollbarThumb.style.transform = `translateY(${thumbY}px)`;
		main__container.scrollTop = scrollPosition;
		}
	}

	function onMouseUp() {
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener( "mouseup", onMouseUp );
		
		spiderweb.classList.remove("enscrolled")
		body.classList.remove( "enscrolled" )
		audio.muted()
	}
});
