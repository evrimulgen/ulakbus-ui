/**
 * Copyright (C) 2015 ZetaOps Inc.
 *
 * This file is licensed under the GNU General Public License v3
 * (GPLv3).  See LICENSE.txt for details.
 */

'use strict';


var crud = angular.module('ulakbus.crud', ['ngRoute', 'schemaForm', 'formService', 'ui.bootstrap']);


/**
 * CRUDAddEditCtrl is a controller
 * which provide a form with form generator.
 */

crud.controller('CRUDAddEditCtrl', function ($scope, $rootScope, $location, $http, $log, $modal, $timeout, Generator, $routeParams) {
    $scope.url = 'crud';
    $scope.form_params = {'model': $routeParams.model};
    if ($routeParams.id) {
        $scope.form_params['object_id'] = $routeParams.id;
        $scope.form_params['cmd'] = 'edit';
    }
    else {
        $scope.form_params['cmd'] = 'add';
    }

    // get form with generator
    $scope.loaddata = function() {
        console.log('loading data');
        Generator.get_form($scope);
    };

    // todo remove timeout to load controller efficiently
    //$timeout($scope.loaddata, 1000);
    $scope.loaddata();
    $scope.onSubmit = function (form) {
        $scope.$broadcast('schemaFormValidate');
        if (form.$valid) {
            Generator.submit($scope)
                .success(function(data){
                    $location.path("/crud");
                })
                .error(function(data){
                    $scope.message = data.title;
                });
        }
    };
});

/**
 * CRUD List Controller
 */

crud.controller('CRUDListCtrl', function ($scope, $rootScope, Generator, $routeParams) {
    $scope.url = 'crud';
    $scope.form_params = {"model": $routeParams.model};
    // call generator's get_list func
    Generator.get_list($scope)
        .then(function (res) {
            var data =  res.data.objects;
            for (var item in data){
                delete data[item].data['deleted'];
                delete data[item].data['timestamp'];
            }
            $scope.objects = data;
            $scope.model = $routeParams.model;
        });
});

/**
 * CRUD Show Controller
 */
crud.controller('CRUDShowCtrl', function ($scope, $rootScope, Generator, $routeParams) {
    $scope.url = 'crud';
    $scope.form_params = {"object_id": $routeParams.id, "cmd": "show", "model": $routeParams.model};
    // call generator's get_single_itemfunc
    Generator.get_single_item($scope).then(function (res) {
        $scope.object = res.data.object;
        $scope.model = $routeParams.model;
    })
});