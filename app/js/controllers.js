
var myApp = angular.module('myApp',[]);

myApp.factory('Data',function(){
    return {message:"Service Data"}
})

function FirstCtrl($scope, Data){
    $scope.data = Data;
}

function SecondCtrl($scope, Data){
    $scope.data = Data;

    $scope.reversedMassage = function(){
        return $scope.data.message.split("").reverse().join("");
    }
}