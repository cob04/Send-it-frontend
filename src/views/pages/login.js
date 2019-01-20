let loginPage =  {
	render: async () => {
		return `
	<section class="main">
		<div class="container">
			<form class="account-form">
			<h2>Login to Send-It</h2>
			<hr/>
				<div class="form-group">
					<label>Email</label>
					<input id="e-mail" type="email" name="E-mail" placeholder="your e-mail address">
				</div>
				<div class="form-group">
					<label>Password</label>
					<input id="password" type="password" name="password" placeholder="your password">
				</div>
				<button id="logInButton" type="submit" class="btn-action btn-block">Log in</button>
			</form>
			<p class="text-center">Don't have an account? <a href="#/signup">Sign up</a></p>
		</div>
	</section>`},

	after_rendering: async () => {
		const logIn = () => {
			let email = document.getElementById("e-mail").value;
			let password = document.getElementById("password").value;
			console.log("OUr first variable ", name);

			let user_login_data = {
				email: email,
				password: password,
			}

			const url = "http://127.0.0.1:5000/api/v3/auth/login"

			fetch(url, {
				method: 'POST',
				body: JSON.stringify(user_login_data),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.message === "Success"){
					alert("Youre logged in " + response.user.name + "!!!");
					localStorage.setItem("token", response.access_token);
					window.location.href = "/#/dashboard";
				} else {
					alert(response.message);
				}
			})
			.catch(error => {
				console.log(response);
			});
		};

		const logInButton = document.getElementById("logInButton");

		logInButton.addEventListener("click", function myHandler(event){
			event.preventDefault();
			logIn();
		})

	}
}

export default loginPage;