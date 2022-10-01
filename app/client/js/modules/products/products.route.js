import productsHtml from './list/products.html';
import productHtml from './show/product.html';

export default function RouteConfigs($stateProvider) {
    'ngInject';
    $stateProvider
        .state('management.products', {
            url: '/products',
            templateUrl: productsHtml,
            controller: 'productsCtrl',
            controllerAs: 'vm'
        })
        .state('management.product', {
            url: '/products/:id',
            templateUrl: productHtml,
            controller: 'productCtrl',
            controllerAs: 'vm'
        });
}
