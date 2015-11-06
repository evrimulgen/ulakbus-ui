'use strict';

app.config(['$routeProvider', function ($routeProvider, $route) {
    $routeProvider
        .when('/login', {
            templateUrl: 'components/auth/login.html',
            controller: 'LoginCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'components/dashboard/dashboard.html',
            controller: 'DashCtrl'
        })
        //.when('/crud/:model/:param/:id/add', {
        //    templateUrl: 'components/crud/templates/add.html',
        //    controller: 'CRUDAddEditCtrl'
        //})
        //.when('/crud/:model/:param/:id/edit/:key', {
        //    templateUrl: 'components/crud/templates/add.html',
        //    controller: 'CRUDAddEditCtrl'
        //})
        //.when('/crud/:model/:param/:id/list', {
        //    templateUrl: 'components/crud/templates/list.html',
        //    controller: 'CRUDListCtrl'
        //})
        //.when('/crud/:model/:param/:id/detail/:key', {
        //    templateUrl: 'components/crud/templates/show.html',
        //    controller: 'CRUDShowCtrl'
        //})

        // use crud without selected user
        .when('/crud/:model/list', {
            templateUrl: 'components/crud/templates/list.html',
            controller: 'CRUDListCtrl'
        })
        .when('/crud/:model/add', {
            templateUrl: 'components/crud/templates/add.html',
            controller: 'CRUDAddEditCtrl'
        })
        .when('/crud/:model/edit/:key', {
            templateUrl: 'components/crud/templates/add.html',
            controller: 'CRUDAddEditCtrl'
        })
        .when('/crud/:model/detail/:key', {
            templateUrl: 'components/crud/templates/show.html',
            controller: 'CRUDShowCtrl'
        })

        // wf links just need model
        .when('/:model/', {
            templateUrl: 'components/wf/templates/add.html',
            controller: 'WFAddEditCtrl'
        })
        .otherwise({redirectTo: '/dashboard'});
}])
    .run(function ($rootScope) {

        $rootScope.loggedInUser = true;
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            // will be used when needed
        });
    })
    .config(['$httpProvider', function ($httpProvider) {
        // to send cookies CORS
        $httpProvider.defaults.withCredentials = true;
    }])
    .run(function (gettextCatalog) {
        gettextCatalog.setCurrentLanguage('tr');
        gettextCatalog.debug = true;
    })
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        // no need bar on top of the page, set to false
        cfpLoadingBarProvider.includeBar = false;
        // loaderdiv is a placeholder tag for loader in header-sub-menu.html
        cfpLoadingBarProvider.parentSelector = "loaderdiv";
        // loader template will be used when loader initialized
        cfpLoadingBarProvider.spinnerTemplate = '<div class="loader">Loading...</div>';
    }]);