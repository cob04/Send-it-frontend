"use strict";


import homePage from './views/pages/home.js' 
import dashboardPage from './views/pages/dashboard.js' 
import profilePage from './views/pages/profile.js' 
import signupPage from './views/pages/signup.js' 
import loginPage from './views/pages/login.js' 


const routes = {
	'/': homePage,
	'/dashboard': dashboardPage,
	'/profile': profilePage,
	'/signup': signupPage,
	'/login': loginPage,
};


let parseUrl = () => {

	let url = location.hash.slice(1).toLowerCase() || '/';
	let request_string = url.split("/");
	let request = {
		resource: null,
		id: null,
		verb: null
	}
	request.resource = request_string[1];
	request.id = request_string[2];
	request.verb = request_string[3];

	return request;
}

const router = async () => {

	let contentDiv = document.getElementById('page_content');
	let request = parseUrl();

	let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
	console.log(parsedURL);

	let page = routes[parsedURL];
	contentDiv.innerHTML = await page.render();
	await page.after_rendering();
}

// On hash change
window.addEventListener('hashchange', router);

// On page load
window.addEventListener('load', router);
