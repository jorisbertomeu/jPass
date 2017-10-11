angular.module('jPass').controller('UserController', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog){
  $scope.headers = [
    {
      name:'',
      field:'thumb'
    },{
      name: 'Name', 
      field: 'name'
    },{
      name: 'Username', 
      field: 'username'
    },{
      name:'Admin', 
      field: 'role'
    },{
      name:'Groups', 
      field: 'groups'
    },{
      name: 'Last Modified', 
      field: 'last_modified'
    },{
      name: '', 
      field: 'actions'
    }
  ];
  
  $scope.content = [
    {
      thumb:'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png', 
      name: 'Joris Bertomeu', 
      username: "jbertomeu@ics.fr",
      role: 'administrator',
      groups: [
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
      ],
      last_modified: 1507713128
    }
  ];
  
  $scope.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
  $scope.sortable = ['name', 'description', 'last_modified'];
  $scope.thumbs = 'thumb';
  $scope.count = 3;
}]);
