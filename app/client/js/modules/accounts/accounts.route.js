import accountsHtml from './list/accounts.html';
import accountHtml from './show/account.html';

export default function RouteConfigs($stateProvider) {
    'ngInject';
    $stateProvider
        .state('management.accounts', {
            url: '/accounts',
            templateUrl: accountsHtml,
            controller: 'AccountsCtrl',
            controllerAs: 'vm'
        })
        .state('management.account', {
            url: '/accounts/:id',
            templateUrl: accountHtml,
            controller: 'AccountCtrl',
            controllerAs: 'vm'
        });
}
