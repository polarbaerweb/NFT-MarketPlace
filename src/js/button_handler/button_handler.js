const audio = new Audio( "files/audio/button-clicked.mp3" );

document.documentElement.addEventListener( "click", function ( event )
{
	/*
		To check if a parent element or a target contains navigation-button 
		class then play a clicking sound
	*/
	const parentElement = event.target.parentElement.classList
	const target = event.target.classList

	const isButton = parentElement.contains( "navigation-button" )
		|| target.contains( "navigation-button" )
		|| event.target.tagName === "A"

	if ( isButton)
	{
		audio.play()
	} 
})