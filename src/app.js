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