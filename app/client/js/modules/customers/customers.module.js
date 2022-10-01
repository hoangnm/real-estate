import angular from 'angular';

import routes from './customers.route.js';
import CustomersCtrl from './list/customers.controller';
import CustomerCtrl from './show/customer.controller';
import CustomerEditorCtrl from './editor/customer-editor.controller';

export default angular.module('app.customers', [])
    .config(routes)
    .controller('CustomersCtrl', CustomersCtrl)
    .controller('CustomerCtrl', CustomerCtrl)
    .controller('CustomerEditorCtrl', CustomerEditorCtrl)
    .name;
