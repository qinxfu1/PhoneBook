(function(){
'use strict';

// Declare app level module which depends on views, and components
angular.module('phoneBook',[])

.service('ravensService', function ($http, $q){
  var deferred = $q.defer();
  $http.get('json/seed.json').then(function (data) {
    deferred.resolve(data);
  });

  this.getPlayers = function(){
    return deferred.promise;
  }
})

.controller('ravensCtrl', function ($scope, ravensService){
  this.showForm = false;
  this.showList = true;
  var promise = ravensService.getPlayers();
  promise.then(function(data){
    $scope.data = data.data;
    $scope.contacts = $scope.data.contacts;
    console.log($scope.contacts);
  });

})

.directive('createNew', function(){
  return {

    restrict: 'E',
    templateUrl: 'partials/create-new.html',
    replace: true,
    controller: function($scope){

      this.addContact = function(form){
         $scope.$parent.contacts.push(this.contact);
         this.contact = {};
      };

    },
    controllerAs: 'reviewFormCtrl',
    scope: {
      contacts: '=',
    }
  }

})

.directive('modifyContact', function(){
  return {

    restrict: 'E',
    templateUrl: 'partials/modify-contact.html',
    replace: true,
    controller: function(){

      this.modify = false;
      console.log("test");
      this.ShowAddedForm = function(contact){
        this.modify = !this.modify;
        console.log("test");
        this.contact = contact;
      };

      this.saveModifiedContact = function(form){
         this.modify = !this.modify;
      };

    },
    controllerAs: 'modifyContactCtrl',
  }

})

.directive('contactContent', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/contact-content.html',
    replace: true
  }
})



})();
