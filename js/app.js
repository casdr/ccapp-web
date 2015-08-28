var apiUrl = 'http://office97.inwestervoort.net/experium/hudson';

var app = angular.module('ccwebApp', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/schedule', {
      	templateUrl: 'partials/schedule.html',
      	controller: 'ScheduleCtrl'
      }).
      otherwise({
        redirectTo: '/schedule'
      });
}]);

app.controller('MainCtrl', function ($scope, $http) {

});

app.controller('LoginCtrl', function ($scope, $http, $location) {
	$scope.error = '';
	$scope.appcode = '';
	$scope.doLogin = function () {
		$scope.error = '';
		var code = $scope.appcode;
		if(code == '') {
			$scope.error = 'Vul een code in';
		} else {
			code = code.replace(/ /g, '');
			$http.get(apiUrl + '/v2/zportal/settoken/' + code)
			.success(function (data) {
				localStorage.setItem('ztoken', data.token);
				$location.path('/schedule');
			})
			.error(function (data) {
				$scope.error = data.error;
				$scope.appcode = '';
			});
		}
	}
});

app.controller('ScheduleCtrl', function ($scope, $http, $location) {
	$scope.days = {
		0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
	};
	$scope.ldays = {
		"Maandag": 1,
		"Dinsdag": 2,
		"Woensdag": 3,
		"Donderdag": 4,
		"Vrijdag": 5
	};
	if(localStorage.getItem('ztoken') == null) {
		$location.path("/login");
	} else {
		$http.get(apiUrl + '/v2/zportal/schedule/36')
		.success(function (data) {
			$scope.lessonData = data;
			data.sort(function(a, b) {
				return a['start'] - b['start'];
			});
			data.forEach(function (element, index, array) {
				var date = new Date(element.start * 1000);
				var day = date.getDay();
				if(element.cancelled || element.hidden) return;
				$scope.days[day].push(element);
			});
		});
	}
});