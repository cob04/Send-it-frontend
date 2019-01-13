let homePage = `
	<section id="intro">
		<div class="overlay">
			<div class="container">
				<div class="content">
					<h1>Deliver with a click</h1>
					<h3>With Send-It, deliver any item from anywhere to everywhere in Kenya.</h3>
					<h3>And all you have to do is click a button, wherever you are.</h3>
					<form class="order-form" action="create-order.html">
						<div class="form-group">
							<label><i class="fas fa-map-marker-alt"></i> From</label>
							<input list="locations" type="text" name="from" placeholder="Pickup location">
						</div>
						<div class="form-group">
							<label><i class="fas fa-map-marker-alt"></i> To</label>
							<input list="locations" type="text" name="To" placeholder="Dropoff location">
							<datalist id="locations">
								<option value="Nairobi"></option>
								<option value="Kisumu"></option>
								<option value="Eldoret"></option>
								<option value="Mombasa"></option>
								<option value="Nyeri"></option>
							</datalist>
						</div>
						<div class="form-group">
							<button class="btn-action"><a href="new-order.html"><i class="fas fa-truck"></i> Make Delivery</a></button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	<section id="marketing">
		<div class="container">
			<div class="item">
				<i class="fas fa-3x fa-truck"></i>
				<h3>Coverage</h3>
				<p>Our network of drivers and vehicles is spread out widely. Whenever you want to deliver something, a driver will always be close by to take up that delivery.
				</p>
			</div>
			<div class="item">
				<i class="fas fa-3x fa-grin-beam"></i>
				<h3>Covenient</h3>
				<p>We make deliveries easy, so you can focus on more important things.You do not need to worry about fuel, vehicle maintainance or even directions.</p>
			</div>
			<div class="item">
				<i class="fas fa-3x fa-money-bill"></i>
				<h3>Affordable</h3>
				<p>We'll only charge you for the distance of the delivery. No paying drivers, vehicle insurance and other overhead charges. You'll save more.
				</p>
			</div>
		</div>
	</section>`

export default homePage;