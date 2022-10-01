import jquery from 'jquery';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootStrap from 'angular-ui-bootstrap';
import { ngTableModule } from 'ng-table';
import uiSelect from 'ui-select';
import angularTranslate from 'angular-translate/dist/angular-translate';
import ngSanitize from 'angular-sanitize';
import angularMap from 'ngmap/build/scripts/ng-map';
import ngFileUpload from 'ng-file-upload';
import uiNotification from 'angular-ui-notification';
import ngstorage from 'ngstorage/ngStorage';

import 'font-awesome/css/font-awesome.css';
import 'ionicons/css/ionicons.css';
import 'admin-lte/bootstrap/css/bootstrap.css';
import 'ui-select/dist/select.css';
import 'ng-table/bundles/ng-table.css';
import 'angular-ui-notification/dist/angular-ui-notification.css';

import '../less/app.less';

import components from './components';
import filters from './filters';
import services from './services';
import errors from './errors';
import appRoutes from './app.route';

import loginCtrl from './pages/login/login.controller';
import managementCtrl from './pages/management/management.controller';

import customers from './modules/customers/customers.module';
import products from './modules/products/products.module';
import groupAccount from './modules/group-accounts/group-accounts.module';
import account from './modules/accounts/accounts.module';

import { APP_CONFIG } from './config';

import mockApi from './mock-api';

import translation from './translate';

var core = angular.module('app.core', [ngstorage.name, uiRouter, uiBootStrap, ngTableModule.name, uiSelect, angularTranslate, ngSanitize, angularMap, ngFileUpload, uiNotification]).name;

angular.module('app', [core, products, customers, groupAccount, account, components, services, filters, errors, mockApi])
    .config(function ($urlRouterProvider, $locationProvider, $httpProvider) {
        'ngInject';
        $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
        $httpProvider.interceptors.push(['$sessionStorage', function ($sessionStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($sessionStorage.user && $sessionStorage.user.token) {
                        config.headers['X-Access-Token'] = $sessionStorage.user.token;
                    }
                    return config;
                }
            };
        }]);
        $urlRouterProvider.otherwise('/login');
    })
    .config(translation)
    .constant('APP_CONFIG', APP_CONFIG)
    .config(appRoutes)
    .controller('LoginCtrl', loginCtrl)
    .controller('ManagementCtrl', managementCtrl);