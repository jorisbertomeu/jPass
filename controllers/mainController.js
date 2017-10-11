angular.module('jPass').controller('MainController', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$timeout', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $timeout){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  $scope.isConnecting = false;
  $scope.connectedUser = {
    name: null,
    username: null,
    role: null,
    thumb: null,
  }
  var {ipcRenderer, remote} = require('electron');
  var main = remote.require("./main.js");
  $scope.connected = false;
  $scope.connection = {
    username: null,
    server: "10.10.2.50:3342",
    password: null,
    keyPath: null
  };
  var baseDir = './partials/';
  var self = $scope;
  $scope.pages = ["dashboard", "vaults", "default", "users", "settings", "login"];
  $scope.getPageURL = function(name) {
    for (var i = 0; i < $scope.pages.length; i++) {
      if ($scope.pages[i] == name)
        return baseDir + name + ".html";
    }
    return baseDir + "default.html";
  }
   ipcRenderer.on('connect-reply', (event, arg) => {
      if (arg != null) {
        $timeout(function() {
          console.log(arg);
          self.connected = true;
          self.switchTo('dashboard');
          $scope.connectedUser = arg;
        });
      }
      $timeout(function() {
        self.isConnecting = false;
        console.log($scope.isConnecting);
      });
    });

   ipcRenderer.on('chooseFile-reply', (event, arg) => {
    $timeout(function() {
      self.connection.keyPath = arg[0];
    });
   });

  $scope.selectPrivateKey = function() {
    ipcRenderer.send('chooseFile', null);
  }

  $scope.connectMe = function() {
    $scope.isConnecting = true;
    $timeout(function() {
      ipcRenderer.send('connect', {
        username: self.connection.username,
        keyPath: self.connection.keyPath,
        password: self.connection.password,
        server: self.connection.server
      });
    }, 500);
  }

  $scope.switchTo = function(pageName) {
    $scope.currentViewURL = $scope.getPageURL(pageName);
  }
 
  $scope.currentViewURL = $scope.getPageURL('login');
    $scope.menu = [
    {
      link : '$scope.switchTo("dashboard")',
      title: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link : '$scope.switchTo("vaults")',
      title: 'Vaults',
      icon: 'vpn_key'
    }
  ];
  $scope.admin = [
    {
      link : '$scope.switchTo("users")',
      title: 'User management',
      icon: 'group'
    },
    {
      link : '$scope.switchTo("settings")',
      title: 'Settings',
      icon: 'settings'
    }
  ];
  $scope.executeCallback = function(functionName) {
    var exec = eval(functionName);
  }
  $scope.alert = '';
  $scope.showListBottomSheet = function() {
    console.log('showbottomsheet');
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl'
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
}]);
