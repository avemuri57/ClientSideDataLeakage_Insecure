angular.module('RegisterCtrl', []).controller('RegisterController', ['$scope','$http','$location',function($scope,$http,$location) {

	$scope.tagline = 'MEAN Stack Client Side Bypass Demo';	
	$scope.registerData={};

	$scope.register=function(){
		$http.post("/api/register/",$scope.registerData)
		.success(function(data){
			console.log("Successfully Registered User");
				$scope.registerData={};
				$location.path('/');

		})
		.error(function(data){
			console.log("Something Went Wrong, Could not register user.");
				$scope.registerData={};
				$location.path('/');

		});


	}

}]);