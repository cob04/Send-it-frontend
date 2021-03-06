const prod_domain = "https://gin-bob.herokuapp.com"
const local_domain = "http://127.0.0.1" 

let dashboardPage =  {
	render: async () => {
		return `
	<section class="main">
		<div class="container">
			<h1>Welcome to your Dashboard.</h1>
			<p>From here you can create new orders or edit existing ones</p>
			<button id="orderModalBtn" class="btn-green">Create new Order</button>
		</div>

	</section>
	<section class="main-alt">
		<div class="container">
			<table id="parcels" class="orders">
				<tr>
					<th>ID</th>
					<th><i class="fa fa-user"></i> Sender</th>
					<th><i class="fa fa-user"></i> Recipient</th>
					<th><i class="fa fa-map-marker-alt"></i> From</th>
					<th><i class="fa fa-map-marker-alt"></i> To</th>
					<th><i class="fa fa-map-marker-alt"></i> Current Location</th>
					<th><i class="fa fa-heart"></i> Status</th>
					<th><i class="fa fa-cog"></i> Actions</th>
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
	<div id="destinationModal" class="modal">
	  	<div class="modal-content">
    		<span class="close">&times;</span>
    		<form class="modal-form">
				<h2><i class="fa fa-map-marker-alt"></i> Change Destination</h2>
				<hr/>
				<div class="form-group">
					<label>Destination</label>
					<input id="editDestination" type="text" placeholder="New destination">
				</div>
				<button id="destinationBtn" type="submit" class="btn-action btn-sm"><i class="fa fa-save"></i> Save</button>
			</form>
  		</div>
	</div> 
	`},

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
					<td>${parcel.id}</td>
					<td>${parcel.sender}</td>
					<td>${parcel.recipient}</td>
					<td>${parcel.pickup}</td>
					<td>${parcel.destination}</td>
					<td>${parcel.present_location}</td>
					<td>${parcel.status}</td>
					<td>
						<button data-id="${parcel.id}" class="cancelBtn btn-action btn-sm"><i class="fa fa-ban"></i> Cancel</button>
						<button data-id="${parcel.id}" class="changeDestinationBtn btn-green btn-sm"><i class="fa fa-map-marker-alt"></i> Change Destination</button>
					</td>
				`
				document.getElementById('parcels').appendChild(item);
			});

			cancelOrderHandler();
			editDestinationHandler();
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
					modal.style.display = "none";
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

     		let url = prod_domain + `/api/v3/parcels/${button.dataset.id}/cancel`;

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

let editDestinationHandler = () => {
	// edit an order
	let edit_buttons = document.querySelectorAll(".changeDestinationBtn");
	let modal = document.getElementById("destinationModal");
	let span = document.getElementsByClassName("close")[1];

	for (let button of edit_buttons){
		button.addEventListener("click", () => {
			modal.style.display = "block";
			changeDestination(button.dataset.id);
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


let changeDestination = (id) => {
	let destination_button = document.getElementById("destinationBtn");

	destination_button.addEventListener("click", () => {
		let modal = document.getElementById("destinationModal");

		let new_destination = document.getElementById("editDestination").value;

		let data = {
			destination: new_destination
		}

		let url = prod_domain + `/api/v3/parcels/${id}/destination`;

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
				alert("order destination changed");
				document.getElementById("editDestination").value = ""
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



export default dashboardPage;