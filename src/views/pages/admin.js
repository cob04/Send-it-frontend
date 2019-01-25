let adminPage =  {
	render: async () => {
		return `
	<section class="main">
		<div class="container">
			<h1>Welcome to the Admin Dashboard.</h1>
			<p>From here you can create new orders or edit existing ones</p>
			<button id="orderModalBtn" class="btn-green">Create new Order</button>
		</div>
	</section>
	<section class="main-alt">
		<div id="parcels" class="container">
		</div>
	</section>
	<div id="orderModal" class="modal">
	  	<div class="modal-content">
    		<span class="close">&times;</span>
    		<form class="modal-form">
				<h2>Create a new Order</h2>
				<hr/>
				<div class="form-group">
					<label>Sender</label>
					<input id="sender" type="text" placeholder="Enter sender's name">
				</div>
				<div class="form-group">
					<label>Recipient</label>
					<input id="recipient" type="text" placeholder="Enter recipient's name">
				</div>
				<div class="form-group">
					<label>Pickup</label>
					<input id="pickup" type="text" placeholder="Pickup location">
				</div>
				<div class="form-group">
					<label>Destination</label>
					<input id="destination" type="text" placeholder="Destination location">
				</div>
				<div class="form-group">
					<label>Weight</label>
					<input id="weight" type="text" placeholder="Parcel weight">
				</div>
				<button id="createOrderBtn" type="submit" class="btn-action">Create Order</button>
			</form>
  		</div>163447563
	</div> `},

	after_rendering: async () => {

		const fetchOrders = () => {
			let url = "https://gin-bob.herokuapp.com/api/v3/parcels";

			let token = localStorage.getItem("token");

			fetch(url, {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.message === "Success"){
					let parcel_orders = response.parcel_orders;
					parcelOrders(parcel_orders);
				} else {
					console.log(response);
					alert(response.msg);
				}
			})
			.catch(error => {
				console.log(response);
			});
		}

		let parcelOrders = (parcel_orders) => {
			parcel_orders.forEach(parcel => {
				console.log("running");
				let items = document.createElement("div");
				items.innerHTML = `
					<div class="thumbnail">
						<p>
							<span>ID:</span> ${parcel.id} <a href="/#/parcels/${parcel.id}">
							<button class="btn-blue btn-sm">More details</button></a>
						</p>
						<p><span>Sender:</span> ${parcel.sender}</p>
						<p><span>Recipient:</span> ${parcel.recipient}</p>
						<p><span>From:</span> ${parcel.pickup}</p>
						<p><span>To:</span> ${parcel.destination}</p>
						<p><span>Status:</span> ${parcel.status}</p>
						<button id=""class="btn-action btn-sm">Cancel</button>
						<button class="btn-green btn-sm">Alter destination</button>
					</div>`
				document.getElementById('parcels').appendChild(items);
			});
		}

		fetchOrders();

		let modal = document.getElementById('orderModal');
		let btn = document.getElementById("orderModalBtn");
		let span = document.getElementsByClassName("close")[0];

		btn.onclick = function() {
			modal.style.display = "block";
		}

		span.onclick = function() {
			modal.style.display = "none";
		}

		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}

		const createOrder = () => {
			let sender = document.getElementById("sender").value;
			let recipient = document.getElementById("recipient").value;
			let pickup = document.getElementById("pickup").value;
			let destination = document.getElementById("destination").value;
			let weight = document.getElementById("weight").value;

			let new_order_data = {
				sender: sender,
				recipient: recipient,
				pickup: pickup,
				destination: destination,
				weight: weight
			}

			const url = "https://gin-bob.herokuapp.com/api/v3/parcels";

			let token = localStorage.getItem("token");

			fetch(url, {
				method: 'POST',
				body: JSON.stringify(new_order_data),
				headers: {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.message === "Success"){
					window.location.href = "#/admin";
					modal.style.display = "none";
				} else {
					console.log(response.message);
				}
			})
			.catch(error => {
				console.log(response.message);
			});
		}

		let orderBtn = document.getElementById("createOrderBtn");

		orderBtn.onclick = function(event){
			createOrder();
		}
	}
}

export default adminPage;