"use strict";


let homePage = `
	<section>
		<h1>Welcome to sendit hompage</h1>
	</section>`

let aboutPage = `
	<section>
		<h1>About Us</h1>
	</section>`

const routes = {
	'/': homePage,
	'/about': aboutPage,
};


let contentDiv = document.getElementById('page_content');
contentDiv.innerHTML = routes[window.location.pathname];

// using History API
let onNavItemClick = (pathName) => {
	window.history.pushState(
		{},
		pathName,
		windown.location.origin + pathName
		);

	contentDiv.innerHTML = routes[pathName];
}

window.onpopstate = () => {
	contentDiv.innerHtml = routes[window.location.pathname];
}