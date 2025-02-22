
const app = document.getElementById("app");

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
	},
	{
		email: 'tost@tost.com',
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

const getTotalSubscribers = (userData) => {
	const subs = users.filter((user) =>{
		return user.refBy == userData.ref
	});
	return subs.length;
}

//função para mostrar 
const showInvite = (userData) =>{
	app.innerHTML = `
	<main>
                <h3>Inscrição confirmada</h3>

                <p>
                    Convide mais pessoas e concorra a prêmios! <br>Compartilhe o link e acompanhe as inscrições:
                </p>

                <div class="input-group">
                    <label for="link">
                        <img src="link.svg" alt="link icon">
                    </label>
                    <input type="text" id="link" disabled>
                </div>
            </main>

            <section class="stats">
                <h4>30</h4>
                <p>
                    Inscrições feitas
                </p>
            </section>

		<!--disabled = desabilitado, forma estática-->
			<input type="text" id="link" value="http://evento.com?ref=${userData.ref}" disabled>

			<div id="stats">
				<h4>
					${getTotalSubscribers(userData)};
				</h4>
				<p>
					Inscrições feitas
				</p>
			</div>

	`

	updateImageLinks();
	app.setAttribute('class', 'page-invite');
}

const saveUser = (userData) =>{
	const newUser = {
		...userData,
		ref: Math.round(Math.random() * 4000),
		refBy: 100
	}

	users.push(newUser)
	console.log(users)
	return newUser
}

const formAction = () => {
	 const form = document.getElementById("form");
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
			const newUser = saveUser(userData);
			showInvite(newUser);
		}
	}
}

const updateImageLinks = () => {
	document.querySelectorAll('img').forEach((img) => {
		if(img.src.includes('githubusercontent')){
			return
		}
		const src = img.getAttribute('src');
		img.src = `http://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`
	});
}

const startApp = () => {
	const content = `
	            <main>
                <section class="about">
                    <div class="section-header">
                        <h2>
                            Sobre o evento
                        </h2>
                        <span class="badge">AO VIVO</span>
                    </div>
                    <p>
                        Um evento feito por e para pessoas desenvolvedoras apainadas por criar soluções inovadoras e compartilha conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
                        <br><br>
                        Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito
                    </p>
                </section>

                <section class="registration">
                    <h2>Inscrição</h2>

                    <form id="form">
                        <div class="input-wrapper">
                            <div class="input-group">
                                <label for="email">
                                    <img src="mail.svg" alt="email icon">
                                </label>
                                <input type="email" name="email" id="email" placeholder="E-mail">
                            </div>

                            <div class="input-wrapper">
                                <div class="input-group">
                                    <label for="phone">
                                        <img src="phone.svg" alt="phone icon">
                                    </label>
                                    <input type="text" name="phone" id="phone" placeholder="Telefone">
                            </div>

                            <button>
                                Confirmar
                                <img src="arrow.svg" alt="Arrow">
                            </button>

                        </div>
                    </form>
                </section>
            </main>
	`;

	app.innerHTML = content;
	app.setAttribute('class', 'page-start');
	updateImageLinks();
	formAction();
};
	

startApp();
// showInvite({
// 	email: "test@test.com",
// 	phone: '999',
// 	ref: 100
// });

document.querySelector("header").onclick = () => startApp()