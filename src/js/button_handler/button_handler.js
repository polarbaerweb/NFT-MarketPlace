const audio = new Audio("files/audio/button-clicked.mp3");


document.documentElement.addEventListener( "click", function ( event )
{
	const parentElement = event.target.parentElement.classList
	const target = event.target.classList

	const isButton = parentElement.contains( "navigation-button" ) || target.contains( "navigation-button" )

	if ( isButton)
	{
		audio.play()
	} 
})