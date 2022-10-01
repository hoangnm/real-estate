import groupsHtml from './list/group-accounts.html';
import groupHtml from './show/group-account.html';

export default function RouteConfigs($stateProvider) {
    'ngInject';
    $stateProvider
        .state('management.group-accounts', {
            url: '/group-accounts',
            templateUrl: groupsHtml,
            controller: 'GroupsCtrl',
            controllerAs: 'vm'
        })
        .state('management.group-account', {
            url: '/group-accounts/:id',
            templateUrl: groupHtml,
            controller: 'GroupCtrl',
            controllerAs: 'vm'
        });
}