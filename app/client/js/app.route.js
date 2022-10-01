import loginHtml from './pages/login/login.html';
import managmentHtml from './pages/management/management.html';

export default function RouteConfigs($stateProvider) {
    'ngInject';
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: loginHtml,
            controller: 'LoginCtrl',
            controllerAs: 'vm'
        })
        .state('management', {
            url: '/management',
            templateUrl: managmentHtml,
            controller: 'ManagementCtrl',
            controllerAs: 'vm'
        });
}