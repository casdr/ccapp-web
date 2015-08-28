var apiUrl = 'http://api.ccapp.it';

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

app.controller('MainCtrl', function ($scope, $http, $sce) {
	Date.prototype.getWeek = function() {
      var onejan = new Date(this.getFullYear(), 0, 1);
      return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  }
  $scope.selectedWeek = (new Date()).getWeek();

	$scope.weeks = [];
	for(var i = 1; i < 53; i++) {
		$scope.weeks.push(i);
	}
	

	$scope.messages = [];
	var messageIds = localStorage.getItem('ccweb-messages');
	if(messageIds == null) {
		messageIds = '[]';
	}
	messageIds = JSON.parse(messageIds);
	$http.get(apiUrl + '/v2/app/message')
	.success(function (data) {
		data.forEach(function(element) {
			var trusted = $sce.trustAsHtml(element.text);
			if(typeof(messageIds[element.id]) == 'undefined' || messageIds[element.id] == false) {
				$scope.messages.push({
					"type": element.type,
					"text": trusted
				});
			}
			messageIds[element.id] = element.onetime;
		});
		localStorage.setItem('ccweb-messages', JSON.stringify(messageIds));
	});
});

app.controller('LoginCtrl', function ($scope, $http, $location, $rootScope) {
	$rootScope.getSchedule = function () {
		return true;
	}
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

app.controller('ScheduleCtrl', function ($scope, $http, $location, $rootScope) {
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
	$rootScope.getSchedule = function() {
		console.log("getting");
		$scope.days = {
			0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
		};
		$http.get(apiUrl + '/v2/zportal/schedule/' + $scope.selectedWeek.'?token='.localStorage.getItem('ztoken'))
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

	if(localStorage.getItem('ztoken') == null) {
		$location.path("/login");
	} else {
		$scope.getSchedule();
	}
});