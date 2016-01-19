var app = angular.module('carpool', []);

app.controller('navbarCtrl', function ($scope, $http, $window) {

    $scope.logOut = function () {
        $http.get('./logout').success(function () {
            $window.location.href = '/';
        });
    };

    $http.get('./getuser').success(function (data) {

        if (data) {
            $scope.isSigned = true;
            $scope.signedName = data;
        }


    });
});

app.controller('invListCtrl', function ($scope, $http, $window) {
    //console.log($scope.gamenow);
    $scope.dispState = "OFF";

    $scope.isSet = function (state) {
        return state === $scope.dispState;
    };

    $scope.setTab = function (state) {
        $scope.dispState = state;
    };

    $scope.delPost = function (id) {

        $http.post('./delete', {id: id}).success(function () {
                $window.location.href = '/';
            }
        );


    };


    $http.get('./getinvs').success(function (data) {
        console.log(data);
        console.log('get success');

        $scope.reqs = data[0];
        $scope.offs = data[1];


        //$scope.created = function(invitor) {
        //    if (inviter === signedName) return true;
        //}
    });

});