import angular from 'angular';

import routes from './products.route.js';
import ProductsCtrl from './list/products.controller';
import ProductCtrl from './show/product.controller';
import ProductEditorCtrl from './editor/product-editor.controller';

export default angular.module('app.products', [])
    .config(routes)
    .controller('productsCtrl', ProductsCtrl)
    .controller('productCtrl', ProductCtrl)
    .controller('ProductEditorCtrl', ProductEditorCtrl)
    .name;
