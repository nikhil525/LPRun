app.controller('SignInCtrl', ['runnerInformation','$scope', '$location',function(runnerInformation, $scope, $location){
$scope.test = runnerInformation.get()
console.log($scope.test);
if(Object.keys($scope.test).length != 0) {
 	$location.path( 'lograce' );
 }
$scope.message = 'LP RUN';
$scope.bibno = "";
$scope.startRace = function() {
    $scope.message = 'Run starts in...';
    console.log($scope.bibno);
    runnerInformation.set($scope.bibno);
    $location.path( 'lograce' );
  };
 

}]);

app.factory('runnerInformation', function() {
 var runnerData = {}
 function set(data) {
   runnerData = data;
 }
 function get() {
 	console.log(runnerData);
  return runnerData;
 }

 return {
  set: set,
  get: get
 }

});



