// public/js/appRoutes.js
	angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
			// login page
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		// home page
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegisterController'
		})	
		// admin page
		.when('/admin', {
			templateUrl: 'views/admin.html',
			controller: 'MainController'
		})

		// about page
		.when('/about', {
			templateUrl: 'views/about.html',
			controller: 'MainController'
		});

	$locationProvider.html5Mode(true);

}]);
