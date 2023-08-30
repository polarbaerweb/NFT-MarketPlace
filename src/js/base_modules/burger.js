const header = document.querySelector(".header")
const header_navigation = document.querySelector(".header__navigation")
const burger = document.querySelector( ".burger" )
const burger_item = document.querySelector(".burger__item")
const burger_second_line = document.querySelector( ".burger__second-line" )
const header_list = document.querySelector(".header__list")

function handle_burger ()
{
	header_navigation.classList.toggle("header__navigation--active")
	burger_item.classList.toggle("burger__item--active")
	burger_second_line.classList.toggle( "burger__second-line--active" )
	header_list.classList.toggle("header__list--active")
	document.body.classList.toggle( "lock" )
}

header.addEventListener( "click", ( event ) =>
{
	if ( event.target === burger || event.target === burger_item )
	{
		handle_burger()
	}
})


document.documentElement.addEventListener( "click", (event) =>
{
	if ( event.target !== burger_item && event.target !== burger )
	{	
		header_navigation.classList.remove("header__navigation--active")
		burger_item.classList.remove("burger__item--active")
		burger_second_line.classList.remove( "burger__second-line--active" )
		header_list.classList.remove("header__list--active")
		document.body.classList.remove("lock")
	}
})