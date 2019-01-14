let profilePage = { 

	render: async () => { 
	return `
	<section class="main">
		<div class="container">
			<h1>Welcome [username]</h1>
			<a href="dashboard.html"><button class="btn-green">Dashboard</button></a>
			<div>
				<div class="thumbnail">
					<p class="stats">3 <i class="fas fa-truck"></i></p>
					<p>Finished Delivieries</p>
				</div>
				<div class="thumbnail">
					<p class="stats">2 <i class="fas fa-truck"></i></p>
					<p>Pending Delivieries</p>
				</div>
				<div class="thumbnail">
					<p class="stats">5 <i class="fas fa-truck"></i></p>
					<p>Total Delivieries</p>
				</div>
			</div>
		</div>
	</section>
	<section class="main-alt">
		<div class="container">
			<div class="thumbnail">
				<p>ID: #1234 <a href="parcel-details.html"><button class="btn-blue btn-sm">More details</button></a></p>
				<p>From: Nairobi, 234 lane</p>
				<p>To: Nairobi, 223 drive</p>
				<a href="#"><button class="btn-action btn-sm">Cancel</button></a>
				<a href="#"><button class="btn-green btn-sm">alter destination</button></a>
			</div>
			<div class="thumbnail">
				<p>ID: #1534 <a href="parcel-details.html"><button class="btn-blue btn-sm">More details</button></a></p>
				<p>From: Mombasa, 234 lane</p>
				<p>To: Nairobi, 223 drive</p>
				<a href="#"><button class="btn-action btn-sm">Cancel</button></a>
				<a href="#"><button class="btn-green btn-sm">alter destination</button></a>
			</div>
			<div class="thumbnail">
				<p>ID: #1654 <a href="parcel-details.html"><button class="btn-blue btn-sm">More details</button></a></p>
				<p>From: Nyeri, E34 street</p>
				<p>To: Eldoret, 77 rd</p>
				<a href="#"><button class="btn-action btn-sm">Cancel</button></a>
				<a href="#"><button class="btn-green btn-sm">alter destination</button></a>
			</div>
			<div class="thumbnail">
				<p>ID: #1083 <a href="parcel-details.html"><button class="btn-blue btn-sm">More details</button></a></p>
				<p>From: Nairobi, F24 st</p>
				<p>To: Nairobi, D23 rd</p>
				<a href="#"><button class="btn-action btn-sm">Cancel</button></a>
				<a href="#"><button class="btn-green btn-sm">alter destination</button></a>
			</div>
			<div class="thumbnail">
				<p>ID: #1234 <a href="parcel-details.html"><button class="btn-blue btn-sm">More details</button></a></p>
				<p>From: Nairobi, 234 lane</p>
				<p>To: Nairobi, 223 drive</p>
				<a href="#"><button class="btn-action btn-sm">Cancel</button></a>
				<a href="#"><button class="btn-green btn-sm">alter destination</button></a>
			</div>
		</div>
	</section>`
	},

	after_rendering: async () => {
		console.log("profile");
	}
}
export default profilePage;
