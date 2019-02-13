const prod_domain = "https://gin-bob.herokuapp.com"
const local_domain = "http://127.0.0.1" 

let adminPage =  {
	render: async () => {
		return `
	<section class="main">
		<div class="container">
			<h1>Welcome to the Admin Dashboard.</h1>
			<p>From here you can update order status and present location</p>
			<button id="orderModalBtn" class="btn-green">Create new Order</button>
		</div>
	</section>
	<section class="main-alt">
		<div class="container">
			<table id="parcels" class="orders">
				<tr>
					<th><i class="fa fa-user"></i> Sender</th>
					<th><i class="fa fa-user"></i> Recipient</th>
					<th><i class="fa fa-map-marker-alt"></i> From</th>
					<th><i class="fa fa-map-marker-alt"></i> To</th>
					<th><i class="fa fa-map-marker-alt"></i> Current Location</th>
					<th><i class="fa fa-heart"></i> Status</th>
					<th colspan="2"><i class="fa fa-cog"></i> Actions</th>
				</tr>
			</table>
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
					<input id="weight" type="number" placeholder="Parcel weight">
				</div>
				<button id="createOrderBtn" type="submit" class="btn-action">Create Order</button>
			</form>
  		</div>
  	</div>
  	<div id="editModal" class="modal">
	  	<div class="modal-content">
    		<span class="close">&times;</span>
    		<form class="modal-form">
				<h2><i class="fa fa-map-marker-alt"></i> Update current location</h2>
				<hr/>
				<div class="form-group">
					<label>Location</label>
					<input id="updateLocation" type="text" placeholder="New location">
				</div>
				<button id="editOrderBtn" type="submit" class="btn-action btn-sm"><i class="fa fa-save"></i> Save</button>
			</form>
  		</div>
	</div> 
	<div id="statusModal" class="modal">
	  	<div class="modal-content">
    		<span class="close">&times;</span>
    		<form class="modal-form">
				<h2><i class="fa fa-heart"></i> Update order status</h2>
				<hr/>
				<div class="form-group">
					<select id="statusValue">
						<option value="Not delivered">Not delivered</option>
						<option value="In transit">In transit</option>
						<option value="Delivered">Delivered</option>
						<option value="Cancelled">Cancelled</option>
					</select>
				</div>
				<button id="statusOrderBtn" type="submit" class="btn-action btn-sm"><i class="fa fa-save"></i> Update</button>
			</form>
  		</div>
	</div> `},

	after_rendering: async () => {

		const fetchOrders = () => {
			let url = prod_domain + "/api/v3/parcels";

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
					if (response.msg == "Token has expired"){
						window.location.href = "#/login";
					}
				}
			})
			.catch(error => {
				alert("Oops!, we have encountered an error");
			});
		}

		let parcelOrders = (parcel_orders) => {
			parcel_orders.forEach(parcel => {
				let item = document.createElement("tr");
				item.innerHTML = `
					<td>${parcel.sender}</td>
					<td>${parcel.recipient}</td>
					<td>${parcel.pickup}</td>
					<td>${parcel.destination}</td>
					<td>${parcel.present_location}</td>
					<td>${parcel.status}</td>
					<td colspan="2">
						<button data-id="${parcel.id}" class="cancelBtn btn-action btn-sm"><i class="fa fa-ban"></i> Cancel</button>
						<button data-id="${parcel.id}" class="editBtn btn-green btn-sm"><i class="fa fa-map-marker-alt"></i> Update location</button>
						<button data-id="${parcel.id}" class="statusBtn btn-green btn-sm"><i class="fa fa-heart"></i> Update Status</button>
					</td>
				`
				document.getElementById('parcels').appendChild(item);
			});

			cancelOrderHandler();
			editOrderHandler();
			statusOrderHandler();

		}

		fetchOrders();

		// create order modal
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

			const url = prod_domain + "/api/v3/parcels";

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
					window.location.reload();
				} else {
					console.log(response.message);
				}
			})
			.catch(error => {
				alert("Oops!, we have encountered an error");
			});
		}

		let orderBtn = document.getElementById("createOrderBtn");

		orderBtn.onclick = function(event){
			createOrder();
		}

	}
}


let cancelOrderHandler = () => {
	// Cancel an order

    let cancel_buttons = document.querySelectorAll(".cancelBtn");

    for (let button of cancel_buttons){
     	button.addEventListener("click", () => {

     		let url = `http://127.0.0.1:5000/api/v3/parcels/${button.dataset.id}/cancel`;

			let token = localStorage.getItem("token");

			fetch(url, {
				method: 'PUT',
				headers: {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.message === "Success"){
					alert("parcel order has been cancelled");
					window.location.reload();
				} else {
					alert(response.message);
					window.location.reload();
				}
			})
			.catch(error => {
				alert("Oops!, we have encountered an error");
			});
     	});
    }
}

let editOrderHandler = () => {
	// edit an order
	let edit_buttons = document.querySelectorAll(".editBtn");
	let modal = document.getElementById("editModal");
	let span = document.getElementsByClassName("close")[1];

	for (let button of edit_buttons){
		button.addEventListener("click", () => {
			modal.style.display = "block";
			updateCurrentLocation(button.dataset.id);
		});

		span.addEventListener("click", () => {
			modal.style.display = "none";
		});

		window.addEventListener("click", (event) => {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		});
	}
}


let updateCurrentLocation = (id) => {
	let edit_button = document.getElementById("editOrderBtn");

	edit_button.addEventListener("click", () => {

		let modal = document.getElementById("editModal");

		let new_location = document.getElementById("updateLocation").value;

		let data = {
			present_location: new_location
		}

		let url = `http://127.0.0.1:5000/api/v3/parcels/${id}/presentLocation`;

		let token = localStorage.getItem("token");

		fetch(url, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(response => {
			if (response.message === "Success"){
				alert("Current location updated");
				document.getElementById("updateLocation").value = ""
				window.location.reload();
			} else {
				alert(response.message);
				window.location.reload();
			}
		})
		.catch(error => {
			alert("Oops!, we have encountered an error");
		});
	});
}

let statusOrderHandler = () => {
	// edit an order
	let status_buttons = document.querySelectorAll(".statusBtn");
	let modal = document.getElementById("statusModal");
	let span = document.getElementsByClassName("close")[2];

	for (let button of status_buttons){
		button.addEventListener("click", () => {
			modal.style.display = "block";
			updateOrderStatus(button.dataset.id);
		});

		span.addEventListener("click", () => {
			modal.style.display = "none";
		});

		window.addEventListener("click", (event) => {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		});
	}
}


let updateOrderStatus = (id) => {
	let status_button = document.getElementById("statusOrderBtn");

	status_button.addEventListener("click", () => {

		let modal = document.getElementById("statusModal");

		let new_status = document.getElementById("statusValue").value;

		let data = {
			status: new_status
		}

		let url = `http://127.0.0.1:5000/api/v3/parcels/${id}/status`;

		let token = localStorage.getItem("token");

		fetch(url, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(response => {
			if (response.message === "Success"){
				alert("Order status updated");
				document.getElementById("statusValue").value = ""
				window.location.reload();
			} else {
				alert(response.message.status);
				window.location.reload();
			}
		})
		.catch(error => {
			alert("Oops!, we have encountered an error");
		});
	});
}


export default adminPage;