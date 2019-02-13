"use strict";


import homePage from './views/pages/home.js' 
import dashboardPage from './views/pages/dashboard.js' 
import adminPage from './views/pages/admin.js'
// import profilePage from './views/pages/profile.js' 
import signupPage from './views/pages/signup.js' 
import loginPage from './views/pages/login.js' 


const routes = {
	'/': homePage,
	'/dashboard': dashboardPage,
	'/admin': adminPage,
	// '/profile': profilePage,
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

let watchLinks = (page) => {
	if (page === dashboardPage || page === adminPage){
		console.log("its a dashboardPage or adminPage");
		document.getElementById("signup").style.visibility = "hidden";
		document.getElementById("signin").style.visibility = "hidden";
	}
	if (page === signupPage || page == loginPage){
		console.log("its a signup or login page");
		document.getElementById("signup").style.visibility = "visible";
		document.getElementById("signin").style.visibility = "visible";
	}

}

const router = async () => {

	let contentDiv = document.getElementById('page_content');
	let request = parseUrl();

	let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
	console.log(parsedURL);

	let page = routes[parsedURL];
	watchLinks(page);
	contentDiv.innerHTML = await page.render();
	await page.after_rendering();
}

// On hash change
window.addEventListener('hashchange', router);

// On page load
window.addEventListener('load', router);