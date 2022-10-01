import angular from 'angular';
import productEditorHtml from '../modules/products/editor/product-editor.html';

export default function ProductsService($http, $q, ApiError, APP_CONFIG, $uibModal, utils) {
    'ngInject';
    const HOST = APP_CONFIG.apiHost;
    const API_URL = APP_CONFIG.productApiUrl;
    const IMPORT = APP_CONFIG.importFeature;
    const DELETE = APP_CONFIG.deleteFeature;
    return {
        getProducts: getProducts,
        getProduct: getProduct,
        saveProduct: saveProduct,
        deleteProduct: deleteProduct,
        deleteProducts: deleteProducts,
        importProduct: importProduct,
        openEditor: openEditor,
        buildParamFilter: buildParamFilter,
        uploadFile: uploadFile,
        uploadImage: uploadImage
    };

    function getProducts(options) {
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

    function getProduct(id) {
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

    function saveProduct(product) {
        var defer = $q.defer();
        var url = HOST + API_URL;
        var promise = {};
        if (angular.isDefined(product.id)) {
            promise = $http.put(url, product);
        } else {
            promise = $http.post(url, product);
        }
        promise.then((res) => {
            defer.resolve(res.data);
        }).catch((error) => {
            defer.reject(new ApiError(error.error_message, error.code));
        });
        return defer.promise;
    }

    function deleteProduct(id) {
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

    function deleteProducts(arrId) {
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

    function importProduct() {
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

    function openEditor(productId) {
        var editor = $uibModal.open({
            templateUrl: productEditorHtml,
            size: 'lg',
            keyboard: true,
            controller: 'ProductEditorCtrl',
            controllerAs: 'vm',
            resolve: {
                productId: function () {
                    return productId;
                }
            },
            windowClass: 'modal-custom'
        });

        return editor;
    }

    function uploadFile(file) {
        const IMPORT_URL = APP_CONFIG.apiHost + APP_CONFIG.productApiUrl + APP_CONFIG.importFeature;
        return utils.uploadFile(file, IMPORT_URL);
    }

    function uploadImage(img, productId) {
        const UPLOAD_URL = APP_CONFIG.apiHost + APP_CONFIG.productApiUrl + APP_CONFIG.uploadFeature + productId;
        return utils.uploadFile(img, UPLOAD_URL);

    }

    function buildParamFilter(vmSearchOption) {
        vmSearchOption = vmSearchOption || {};
        var filters = '';
        angular.forEach(vmSearchOption, (value, key) => {
            if (value) {
                filters += key + ':' + value + ';';
            }
        });
        return filters;
    }
}