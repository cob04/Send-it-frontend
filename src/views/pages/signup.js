let signupPage = `
	<section class="main">
		<div class="container">
			<form class="account-form">
			<h2>Sign up for Send-It</h2>
			<hr/>
				<div class="form-group">
					<label>First name</label>
					<input type="text" name="first-name" placeholder="Your first name">
				</div>
				<div class="form-group">
					<label>Last name</label>
					<input type="text" name="last-name" placeholder="Your last name">
				</div>
				<div class="form-group">
					<label>Email</label>
					<input type="email" name="E-mail" placeholder="Email address">
				</div>
				<div class="form-group">
					<label>Password</label>
					<input type="password" name="password" placeholder="Enter a password">
				</div>
				<div class="form-group">
					<label>Password(again)</label>
					<input type="password" name="password2" placeholder="Repeat password">
				</div>
				<button type="submit" class="btn-action btn-block">Sign Up</button>
			</form>
			<p class="text-center">Already have and account? <a href="signin.html">Sign in here</a></p>
		</div>
	</section>`

export default signupPage;