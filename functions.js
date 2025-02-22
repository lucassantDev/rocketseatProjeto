const app = document.getElementById("app")

//array ,vetor para guardar alguns dados ficticios para o projeto.
const users = [ 
	{
		email: 'test@test.com',
		phone: '92939495',
		ref: 100,
		refBy: null 
	},
	{
		email: 'tust@tust.com',
		phone: '94498799',
		ref: 200,
		refBy: 100
	}

];

// função com seta
const getUser = (userData) => {
	return users.find((user) => {
		return user.email == userData.email
	})
}

const updateSubscribers = (userData) => {
	const subs = users.filter((user) =>{
		return userrefBy == userData.email
	})
}

//função para mostrar 
const showInvite = (userData) =>{
	app.innerHTML = `
	<!--disabled = desabilitado, forma estática-->
		<input type="text" id="link" value="http://evento.com?ref=${userData.ref}" disabled>

		<div id="stats">
			<h4>
				88
			</h4>
			<p>
				Inscrições feitas
			</p>
		</div>
	`
}

const formAction = () => {
	 const form = document.getElementById("fora");
	 form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form);
		const userData = {
			email: formData.get('email'),
			phone: formData.get('phone')
		}

		const user = getUser(userData)
		if(user){
			showInvite(user)
		}else{
			///
		}
	}
}

const startApp = () => {
	const content = `

	<form id="form">
		<input type="email" name="email" placeholder="E-mail"/>
		<input type="text" name="phone" placeholder="Telefone"/>
		<button>
			Confirmar
		</button>
	</form>
`
	app.innerHTML = content;

	formAction();
};
startApp();