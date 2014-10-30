angular.module('MainCtrl', ['ngCookies']).controller('MainController',['$scope','$http','$cookieStore','$location','$route','$rootScope', function($scope,$http,$cookieStore,$location,$route,$rootScope) {

	$scope.tagline = 'MEAN Stack Client Side Bypass Demo';	
	

	  $rootScope.$on('$viewContentLoaded', function(){
    	$scope.getAdmin();
    	});

	

$scope.logout=function(){
	console.log("Successfully Logged Out");
	$cookieStore.remove('id');
	$scope.getAdmin();	
	
	$location.path('/');

}


 $scope.getAllUsers=function(){

 	if($scope.isAdmin){
 		console.log("About to Start Getting All Users");
 		$http.post("/api/getAllUsers",{'id':$cookieStore.get('id')})

 		.success(function(data){
 			console.log("Successfully Got All Users");
 			console.log(data);
 			$scope.Users=data;
 			console.log("done");
 		
 		
 		})
 		.error(function(data){
 			console.log("Failed To Get Users");

 		});

 	}

 }


	$scope.getUser=function(){

		if($cookieStore.get('id')){
			
		console.log($cookieStore.get('id'));
		$http.post("/api/getUser",{'id':$cookieStore.get('id')})
		.success(function(data){
			$scope.currentUser= data.name;
		})
			.error(function(data){
				console.log('Something Went Wrong '+data);
			});

			}
		}

		$scope.getAdmin=function(){
		$scope.isAdmin=false;
		if($cookieStore.get('id')){
			
		console.log($cookieStore.get('id'));
		$http.post("/api/getUser",{'id':$cookieStore.get('id')})
		.success(function(data){
			console.log(data);
			 $scope.isAdmin=(data.role=="admin");
		})
			.error(function(data){
				console.log('Something Went Wrong '+data);
				 $scope.isAdmin=false;
			});

			}

		}

}]);