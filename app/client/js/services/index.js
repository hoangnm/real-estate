import angular from 'angular';

import ProductsService from './products.service';
import CustomersService from './customers.service';
import modalConfirmService from './modal-confirm.service';
import UtilsService from './utils.service';
import AccountsService from './accounts.service';
import LocationService from './location.service';
import GroupService from './group-accounts.service';
export default angular.module('app.services', [])
    .factory('productsService', ProductsService)
    .factory('customersService', CustomersService)
    .factory('modalConfirmService', modalConfirmService)
    .factory('utils', UtilsService)
    .factory('accountsService', AccountsService)
    .factory('locationService', LocationService)
    .factory('groupService', GroupService)
    .name;