const main__auction = document.querySelector( "._ibg" )
const img = document.querySelector(".main__auction-bg")


document.addEventListener( "DOMContentLoaded", function ()
{
	const image_path = img.getAttribute( "src" )
	main__auction.style.backgroundImage = `url(${image_path}), no-repeat`
} )

console.log("working", img, main__auction)