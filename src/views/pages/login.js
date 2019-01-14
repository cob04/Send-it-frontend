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
					<input type="email" name="E-mail" placeholder="your e-mail address">
				</div>
				<div class="form-group">
					<label>Password</label>
					<input type="password" name="password" placeholder="your password">
				</div>
				<button type="submit" class="btn-action btn-block">Log in</button>
			</form>
			<p class="text-center">Don't have an account? <a href="signup">Sign up</a></p>
		</div>
	</section>`},

	after_rendering: async () => {
		console.log("login");
	}
}

export default loginPage;