let signupPage = {
	render: async () => {
		return `<section class="main">
			<div class="container">
				<form class="account-form">
					<h2>Sign up for Send-It</h2>
					<hr/>
					<div class="form-group">
						<label>Name</label>
						<input id="name" type="text" name="name" placeholder="Your first name">
					</div>
					<div class="form-group">
						<label>Email</label>
						<input id="e-mail" type="email" name="E-mail" placeholder="Email address">
					</div>
					<div class="form-group">
						<label>Password</label>
						<input id="password" type="password" name="password" placeholder="Enter a password">
					</div>
					<div class="form-group">
						<label>Password(again)</label>
						<input id="password2" type="password" name="password2" placeholder="Repeat password">
					</div>
					<button id="signUpButton" type="submit" class="btn-action btn-block">Sign Up</button>
					</form>
					<p class="text-center">Already have and account? <a href="#/login">Sign in here</a></p>
			</div>
		</section>`
	},

	after_rendering: async () => {
		const signUp = () => {
			let name = document.getElementById("name").value;
			let email = document.getElementById("e-mail").value;
			let password = document.getElementById("password").value;
			let password2 = document.getElementById("password2").value;
			console.log("OUr first variable ", name);

			let new_user_data = {
				name: name,
				email: email,
				password: password,
				password2: password2
			}

			const url = "http://127.0.0.1:5000/api/v3/auth/signup";

			fetch(url, {
				method: 'POST',
				body: JSON.stringify(new_user_data),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.message === "Success"){
					alert("Welcome " + response.user.name + "!!!");
					window.location.href = "/#/login";
				} else {
					alert(response.message);
				}
			})
			.catch(error => {
				console.log(response);
			});
		};

		const signUpButton = document.getElementById("signUpButton");

		signUpButton.addEventListener("click", function myHandler(event){
			event.preventDefault();
			signUp();
		})

	}
}

export default signupPage;
