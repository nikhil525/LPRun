app.controller('LogRaceCtrl', ['$scope', '$location', '$http',function($scope, $location, $http){

  $http.get('http://lilmonkey.net/lpservices/Wishes.svc/getrunner/?Bib=49').
        then(function(response) {
            $scope.runnerinfo = response.data;
            $scope.records = response.data.Laps;
            console.log(JSON.stringify(response.data.Laps));
        });

    //$scope.timere = /\d{2}:\d{2}/;
    $scope.timere = /^[0-9]{2}:[0-9]{2}$/;
    $scope.validatetimee = [30];

    $scope.validatetime = function(laptime, index){       
       $scope.validatetimee[index] = $scope.timere.test(laptime);
       console.log($scope.validatetimee[index]);
    };

    $scope.isDisabled =function(index){
      return !($scope.validatetimee[index]);
    };
        
    $scope.saveLap=function(lap) {
      //console.log(lap)
      //console.log('http://localhost:52258/Wishes.svc/savelap/?Bib=49'+'&Lap='+lap.LapNumber+'&Time='+lap.LapTime);
      $http.get('http://lilmonkey.net/lpservices/Wishes.svc/savelap/?Bib=49'+'&Lap='+lap.LapNumber+'&Time='+lap.LapTime).
        then(function(response) {
            $scope.runnerinfo = response.data;
            if(response.data)
            {
              lapIndex = getIndex(lap);
              $scope.records[lapIndex].LapCompleted = true;
               if(lap.LapNumber == $scope.records.length)
               {
                 var record = {
                    "LapNumber" : $scope.records.length + 1,
                    "LapTime" : "",
                    "LapCompleted": false
                };
                $scope.records.push(record);
               }
            }
            console.log("save was: " + response.data);
        });

    };

    $scope.editLap=function(lap) {
            
      lapIndex = getIndex(lap);
      //console.log(lapIndex);
      $scope.records[lapIndex].LapCompleted = false; 
      $scope.records[lapIndex].backuptime = lap.LapTime;
          // console.log($scope.records[lapIndex].backuptime);
    };

    $scope.cancelLapChanges=function(lap) {
      //console.log(lap.LapNumber);
      lapIndex = getIndex(lap);
      if(lapIndex != $scope.records.length - 1)
      {
        $scope.records[lapIndex].LapTime = $scope.records[lapIndex].backuptime;
        $scope.records[lapIndex].LapCompleted = 1;
      }
      else {
        $scope.records[lapIndex].LapTime = "";        
      }
    };

    function getIndex(lap) {
      return $scope.records.map(function(e) { return e.LapNumber; }).indexOf(lap.LapNumber);
    }

}]);



app.directive('sampleTemplate', function() {
	return {
		restrict: 'AE',
		replace: 'true',
		template: '<p style="background-color:{{color}}">Sample Template</p>',
		link: function(scope, elem, attrs) {
			elem.bind('click', function() {
				elem.css('background-color','white');
				scope.$apply(function() {
					scope.color = "white";
				});
			});
			elem.bind('mouseover',function() {
				elem.css('cursor','pointer');
			});
		}
	};
});

app.directive('countdown', [
    'Util', '$interval', function(Util, $interval) {
      return {
        restrict: 'A',
        replace: 'false',
        scope: {
          date: '@'
        },
        link: function(scope, element) {
          var future;
          future = new Date(scope.date);
          $interval(function() {
            var diff;
            diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
            return element.text(Util.dhms(diff));
          }, 1000);
        }
      };
    }
  ]);


app.service('Util', [
    function() {
      return {
        dhms: function(t) {
          var days, hours, minutes, seconds;
          days = Math.floor(t / 86400);
          t -= days * 86400;
          hours = Math.floor(t / 3600) % 24;
          t -= hours * 3600;
          minutes = Math.floor(t / 60) % 60;
          t -= minutes * 60;
          seconds = t % 60;
          return [days + 'd', hours + 'h', minutes + 'm', seconds + 's'].join(' ');          
        }
      };
    }
  ]);;app.controller('SignInCtrl', ['$scope', '$location',function($scope, $location){
$scope.message = 'LP RUN';

$scope.startRace = function() {
    $scope.message = 'Run starts in...';
    $location.path( 'lograce' );
  };
 

}]);



;app.config(function($routeProvider) {
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