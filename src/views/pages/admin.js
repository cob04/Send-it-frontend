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
		<div class="container">
			<table id="parcels" class="orders">
				<tr>
					<th>Sender</th>
					<th>Recipient</th>
					<th><i class="fa fa-map-marker"></i> From</th>
					<th><i class="fa fa-map-marker"></i> To</th>
					<th><i class="fa fa-map-marker"></i> Current Location</th>
					<th>Status</th>
					<th><i class="fa fa-"></i> Actions</th>
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
					<input id="weight" type="text" placeholder="Parcel weight">
				</div>
				<button id="createOrderBtn" type="submit" class="btn-action">Create Order</button>
			</form>
  		</div>
  	</div>
  	<div id="editModal" class="modal">
	  	<div class="modal-content">
    		<span class="close">&times;</span>
    		<form class="modal-form">
				<h2>Change order status</h2>
				<hr/>
				<div class="form-group">
					<label>Order Status</label>
					<select id="sender" name="status">
						<option value="Delivered">Delivered</option>
						<option value="Not Delivered">No Delivered</option>
						<option value="In transit">In transit</option>
					</select>
				</div>
				<button id="editOrderBtn" type="submit" class="btn-action btn-sm"><i class="fa fa-save"></i> Save</button>
			</form>
  		</div>
	</div> `},

	after_rendering: async () => {

		const fetchOrders = () => {
			let url = "http://127.0.0.1:5000/api/v3/parcels";

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
				let item = document.createElement("tr");
				item.innerHTML = `
					<td>${parcel.sender}</td>
					<td>${parcel.recipient}</td>
					<td>${parcel.pickup}</td>
					<td>${parcel.destination}</td>
					<td>${parcel.present_location}</td>
					<td>${parcel.status}</td>
					<td>
						<button data-id="${parcel.id}" class="cancelBtn btn-action btn-sm"><i class="fa fa-cancel"></i> Cancel</button>
						<button data-id="${parcel.id}" class="editBtn btn-green btn-sm"><i class="fa fa-pencil"></i> Edit</button>
					</td>
				`
				document.getElementById('parcels').appendChild(item);
			});

			cancelOrderHandler();
			editOrderHandler();

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

			const url = "http://127.0.0.1:5000/api/v3/parcels";

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
					window.location.href = "#/admin";
				} else {
					console.log(response.message);
				}
			})
			.catch(error => {
				console.log(response.message);
			});
     	});
    }
}

let editOrderHandler = () => {
	// edit an order

	let edit_buttons = document.querySelectorAll(".editBtn");
	let modal = document.getElementById("editModal");
	let span = document.getElementsByClassName("close")[1];

	console.log(span);

	for (let button of edit_buttons){
		button.addEventListener("click", () => {
			modal.style.display = "block";
			alert(button.dataset.id);
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


export default adminPage;