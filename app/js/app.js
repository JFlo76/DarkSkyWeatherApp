'use strict';

// Declare service(s)
// Normally this service and the following controller would be broken out
// into a separate folder/file then imported via ES6 import or requirejs
var services = angular.module('services', []);

// Set up a service for the dark sky api
services.service('weatherService', ['$q', '$http', function($q, $http) {
	return function (url) {
		var deferred = $q.defer();

		$http.jsonp(url)
			.then(function successCallback(resp) {
				deferred.resolve(resp.data);
			}, function errorCallback(error) {
				console.error('wulp!', error);
				deferred.reject(error);
			});

		return deferred.promise;
	}

}]);

// Set up a service for geolocation
services.service('geoLocationService', ['$q', '$window', function($q, $window) {
	var getLocation = function (url) {
		var deferred = $q.defer();

		if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                }
            );
        }

		return deferred.promise;
	}

	return {
		getLocation: getLocation,
	}

}]);

// Set up controller(s)
var controllers = angular.module('controllers', ['services']);
controllers.controller('mainCtrl', ['$scope', 'geoLocationService', 'weatherService', function($scope, geoLocationService, weatherService) {
	

	// This API key would normally live on the server
	var key = 'bceac9edf2d83f2dc70ae01736e92bd2';
	var apiUrl = 'https://api.forecast.io/forecast/'+ key +'/47.501991200000006,-122.3711661?callback=JSON_CALLBACK';

	weatherService(apiUrl).then(function(data) {
		$scope.weather = data;
	});
	
}]);

// Declare the app with injected dependencies
var app = angular.module('weatherApp', ['services', 'controllers']);

// Set up the component
app.component('weatherComponent', {
	bindings: {
		data: '<',
	},
	templateUrl: './components/conditions.html',
});




