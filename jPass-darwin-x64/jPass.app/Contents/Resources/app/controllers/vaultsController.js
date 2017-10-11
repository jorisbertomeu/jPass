angular.module('jPass').controller('VaultsController', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){
  $scope.groups = [
    {
      title: "My Vault",
      id: "dsqqsd43243",
      type: "private",
      users: []
    },
    {
      title: "Developers",
      id: "dsqqsd43243dssd",
      type: "shared",
      users: []
    },
    {
      title: "Tech",
      id: "dsdqs32432",
      type: "shared",
      users: []
    }
  ]
  $scope.entries = [
      {
        title: 'PDFBox1',
        ip: "10.10.2.10",
        port: "22",
        user: "root",
        password: "icsics",
        author: 'Joris Bertomeu',
        groups: ["dsdqs32432", "dsqqsd43243dssd"],
        type: {
          icon: "vpn_key",
          title: "Password"
        },
        date: " 10/10/2017 - 13:49",
        commands: [
          {
            title: "Putty",
            exec: "C:/program files/putty/bin/putty.exe -c $ip -p $port",
            icon: "exit_to_app"
          }
        ],
        access: "SSH"
      },
      {
        groups: ["dsdqs32432"],
        title: 'PDFBox2',
        ip: "10.10.2.11",
        port: "22",
        user: "root",
        password: "icsics",
        author: 'Joris Bertomeu',
        type: {
          icon: "vpn_key",
          title: "Password"
        },
        date: " 10/10/2017 - 13:56",
        commands: [
          {
            title: "Putty",
            exec: "C:/program files/putty/bin/putty.exe -c $ip -p $port",
            icon: "exit_to_app"
          }
        ],
        access: "SSH"
      },
      {
        groups: ["dsqqsd43243"],
        title: 'Facebook',
        ip: "http://facebook.com/login.php",
        port: "80",
        user: "jobertomeu@orange.fr",
        password: "motdepasse",
        author: 'Joris Bertomeu',
        type: {
          icon: "web",
          title: "Web"
        },
        date: " 11/10/2017 - 13:32",
        commands: [
          {
            title: "Chrome",
            exec: "C:/program files/Google/Google Chrome/bin/chrome.exe -nTW -url=$ip -auth=%TEMPORARY_DIR%/jPass/web/$id_web",
            icon: "link"
          }
        ],
        access: "HTTP"
      }
    ];
  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
}]);
