app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "partials/home.html"
	})
	.when("/error", {
		templateUrl : "partials/error.html"
	})
	.when("/results", {
		templateUrl : "partials/results.html"
	})
	.when("/lograce", {
		templateUrl : "partials/lograce.html"
	});
});