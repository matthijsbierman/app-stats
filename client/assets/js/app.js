(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  run.$inject = ['$rootScope', '$location'];
  function run($rootScope, $location) {
    FastClick.attach(document.body);
    $rootScope.open = function(path) {
      $location.path(path);
    }
  }

  // note: normally a proper build system with controllers and services in separate directories would be set up

  angular.module('application').service('ProjectService', ['$q', function ($q) {
    // normally this would ben an $http call, here we resolve the promise to simulate a successful $http call
    this.getProject = function() {
      return $q(function(resolve) {
        resolve({
          name: 'My Project',
          start: '2016-06-30T02:00:00.000Z',
          end: '2016-07-07T02:00:00.000Z',
          tasks: [
            {name: 'task 1', late: false, confirmed: true, done: true},
            {name: 'task 2', late: true, confirmed: true, done: true},
            {name: 'task 3', late: true, confirmed: true, done: true},
            {name: 'task 4', late: true, confirmed: false, done: false},
            {name: 'task 5', late: true, confirmed: false, done: false},
            {name: 'task 6', late: true, confirmed: false, done: false},
            {name: 'task 7', late: false, confirmed: false, done: false},
            {name: 'task 8', late: false, confirmed: false, done: false},
            {name: 'task 9', late: false, confirmed: false, done: false},
            {name: 'task 10', late: false, confirmed: false, done: false}
          ]
        });
      });
    }
  }]);

  angular.module('application').controller('OverviewController', ['$scope', 'ProjectService', function($scope, ProjectService) {
    ProjectService.getProject().then(function(project) {
      // TODO calculate values in project
      $scope.project = {
        name: project.name,
        start: project.start,
        end: project.end,
        tasks: /*TODO*/ 0, // total nr of tasks
        late: /*TODO*/ 0, // tasks that are late, but not confirmed
        lateConfirmed: /*TODO*/ 0, // tasks that are late *and* confirmed
        done: /*TODO*/ 0 // tasks that are done
      };
    });
  }]);

  angular.module('application').controller('VisualizationController', ['$scope', function($scope) {
    // historic data for the project, recorded how many tasks in total and how many were late or lateConfirmed
    $scope.data = [
      {day:0,tasks:30, late:0, lateConfirmed:0},
      {day:1,tasks:30, late:0, lateConfirmed:0},
      {day:2,tasks:30, late:0, lateConfirmed:0},
      {day:3,tasks:30, late:0, lateConfirmed:0},
      {day:4,tasks:30, late:1, lateConfirmed:0},
      {day:5,tasks:30, late:2, lateConfirmed:0},
      {day:6,tasks:30, late:2, lateConfirmed:0},
      {day:7,tasks:30, late:2, lateConfirmed:0},
      {day:8,tasks:31, late:1, lateConfirmed:1},
      {day:9,tasks:31, late:0, lateConfirmed:2},
      {day:10,tasks:31, late:0, lateConfirmed:2},
      {day:11,tasks:32, late:0, lateConfirmed:2},
      {day:12,tasks:32, late:0, lateConfirmed:2},
      {day:13,tasks:32, late:0, lateConfirmed:2},
      {day:14,tasks:32, late:0, lateConfirmed:2},
      {day:15,tasks:32, late:0, lateConfirmed:2},
      {day:16,tasks:32, late:0, lateConfirmed:2}
    ];
  }]);
})();
