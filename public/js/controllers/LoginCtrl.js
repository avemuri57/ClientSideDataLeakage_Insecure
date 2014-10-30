angular.module('LoginCtrl', ['ngCookies']).controller('LoginController', ['$scope','$http','$location','$cookieStore','$rootScope',function($scope,$http,$location,$cookieStore,$rootScope) {


	$scope.loginData={};


	$scope.login=function(){
		$http.post("/api/login/",$scope.loginData)
		.success(function(data){
			console.log("Successfully Logged In "+data);
			$cookieStore.put('id',data);
			$scope.loginData={};
			$scope.$emit('login',data);
			$location.path('/');

		})
		.error(function(data){
			console.log("Something Went Wrong, Could not login user.");
				$scope.loginData={};
				$location.path('/');

		});
	}

}]);