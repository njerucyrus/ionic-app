angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);

      $scope.feedback = [];
      $data = $scope.loginData;
      $http.post('http://localhost:8000/api/login/', $data).success(function(response){
        
        $scope.feedback.push(response);
        console.log($scope.feedback);

        if (response.status == 'success'){
          username = response.username;
         // alert('correct data submitted');
          window.localStorage.setItem('username', username);
          console.log('the local storage variable', localStorage['username']);
          $scope.closeLogin();
          
        }
        else{
          alert('Invalid Username/ Password');
        }
    });



  };
})

.controller('PostsCtrl', function($scope, $http) {
  $scope.posts = [];
 

  $http.get('http://localhost:8000/api/posts/').success(function(response){
   angular.forEach(response, function(response){
    console.log(response);
    $scope.posts.push(response);
   });
  });

})
.controller('PostDetailCtrl', function($scope, $http){
  $scope.post={};
  console.log($scope.post);
})

.controller('CreateAccountCtrl', function($scope, $http){
    $scope.account_data = {};
    
    $scope.createAccount = function(){
      
      $data = $scope.account_data;
      $http.post('http://localhost:8000/api/create-account/', $data).success(function(response){
        console.log("api response", response.message);
        alert(response.message);
    });


    console.log("Creating account", $scope.account_data);
  };
  
})

.controller('CreatePostCtrl', function($scope, $http){
    $scope.post_data = {};

    
    $scope.createPost = function(){
      $category = $scope.post_data.fish_category;
      $user = window.localStorage['username'];
      $scope.post_data.username = $user;


      
      $data = $scope.post_data;
      console.log("my data with username", $data);

      $http.post('http://localhost:8000/api/create-post/', $data).success(function(response){
        console.log("api response", response.message);
        alert(response.message);
    });


    console.log("Creating post", $scope.post_data);
  };
  
})

.controller('ContactUsCtrl', function($scope, $http){
    $scope.data = {};

    
    $scope.contatUs = function(){
      

      $data = $scope.data;
    
      $http.post('http://localhost:8000/api/contactus/', $data).success(function(response){
        console.log("api response", response.message);
        alert(response.message);
    });


    console.log("Sending contactus", $scope.post_data);
  };
  
})





.controller('Playlists', function($scope, $stateParams) {
});
