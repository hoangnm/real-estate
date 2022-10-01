import customersHtml from './list/customers.html';
import customerHtml from './show/customer.html';

export default function RouteConfigs($stateProvider) {
    'ngInject';
    $stateProvider
        .state('management.customers', {
            url: '/customers',
            templateUrl: customersHtml,
            controller: 'CustomersCtrl',
            controllerAs: 'vm'
        })
        .state('management.customer', {
            url: '/customers/:id',
            templateUrl: customerHtml,
            controller: 'CustomerCtrl',
            controllerAs: 'vm'
        });
}
