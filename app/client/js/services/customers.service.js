import angular from 'angular';
import customerEditorHtml from '../modules/customers/editor/customer-editor.html';
export default function CustomersService($http, $q, ApiError, APP_CONFIG, $uibModal, utils) {
    'ngInject';
    const HOST = APP_CONFIG.apiHost;
    const API_URL = APP_CONFIG.customerApiUrl;
    const CUSTOMER_STATUS_API_URL = APP_CONFIG.customerStatusApiUrl;
    const IMPORT = APP_CONFIG.importFeature;
    const DELETE = APP_CONFIG.deleteFeature;
    return {
        getCustomers: getCustomers,
        getCustomer: getCustomer,
        saveCustomer: saveCustomer,
        deleteCustomer: deleteCustomer,
        deleteCustomers: deleteCustomers,
        importCustomer: importCustomer,
        openEditor: openEditor,
        buildParamFilter: buildParamFilter,
        uploadFile: uploadFile,
        getCustomerStatus: getCustomerStatus
    };

    function getCustomers(options) {
        var defer = $q.defer();
        var url = HOST + API_URL;
        var params = options || {};
        $http.get(url, { params: params })
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }

    function getCustomer(id) {
        var defer = $q.defer();
        var url = HOST + API_URL + '/' + id;
        $http.get(url)
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }

    function saveCustomer(customer) {
        var defer = $q.defer();
        var url = HOST + API_URL;
        var promise = {};
        if (angular.isDefined(customer.id)) {
            promise = $http.put(url, customer);
        } else {
            promise = $http.post(url, customer);
        }
        promise.then((res) => {
            defer.resolve(res.data);
        }).catch((error) => {
            defer.reject(new ApiError(error.error_message, error.code));
        });
        return defer.promise;
    }

    function deleteCustomer(id) {
        var defer = $q.defer();
        var url = HOST + API_URL + '/' + id;
        $http.delete(url)
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }

    function deleteCustomers(arrId) {
        var defer = $q.defer();
        var url = HOST + API_URL + DELETE;
        var promise = {};
        promise = $http.post(url, arrId);
        promise.then((res) => {
            defer.resolve(res.data);
        }).catch((error) => {
            defer.reject(new ApiError(error.error_message, error.code));
        });
        return defer.promise;
    }

    function importCustomer() {
        var defer = $q.defer();
        var url = HOST + API_URL + IMPORT;
        $http.post(url)
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }

    function openEditor(customerId) {
        var editor = $uibModal.open({
            templateUrl: customerEditorHtml,
            size: 'lg',
            keyboard: true,
            controller: 'CustomerEditorCtrl',
            controllerAs: 'vm',
            resolve: {
                customerId: function () {
                    return customerId;
                }
            },
            windowClass: 'modal-custom'
        });

        return editor;
    }

    function uploadFile(file) {
        const IMPORT_URL = APP_CONFIG.apiHost + APP_CONFIG.customerApiUrl + APP_CONFIG.importFeature;
        return utils.uploadFile(file, IMPORT_URL);
    }

    function getCustomerStatus() {
        var defer = $q.defer();
        var url = HOST + CUSTOMER_STATUS_API_URL;
        $http.get(url)
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }

    function buildParamFilter(vmSearchOption) {
        var filters = '';
        angular.forEach(vmSearchOption, (value, key) => {
            if (value) {
                filters += key + ':' + value + ';';
            }
        });
        return filters;
    }

}