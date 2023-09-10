const registration_form = document.querySelector( ".main__registration-form" )
const registration_inputs = document.querySelectorAll( ".main__registration-input" )
const title_box = document.querySelector( ".main__registration-text-box" )



function handle_registration (event)
{	
	event.preventDefault()
	registration_inputs.forEach( input =>
	{	

		const functionActivation = checkPattern( input )
		if (functionActivation.boolean)
		{	
			if ( input.type === "password" )
			{
				input.type = "text"
				input.value = ""
			}

			input.placeholder = functionActivation.message
			input.classList.add( "red" )
			
			setTimeout( () =>
			{
				input.type = "password"
				input.placeholder = ""
				input.classList.remove( "red" )
				
			}, 2000)
		}
	} )
}


function checkPattern ( input )
{
	const pattern = input.dataset.pattern
	
	const re = new RegExp( pattern )
	
	const inputValue = input.value

	const isMatch = re.test( inputValue )
	
	if ( !inputValue )
	{
		return{
			boolean: !inputValue,
			message: `please make sure that ${input.getAttribute("id")} is not empty`
		}
	}

	
	if ( !isMatch )
	{
		return {
			boolean: !isMatch,
			message: `try again, leak ${input.getAttribute("id")}`
		}
	}

	return {
		boolean: false,
		message: "Successfully created account you can log in"
	}
}


registration_form.addEventListener("submit", handle_registration)