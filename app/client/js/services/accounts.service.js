import angular from 'angular';
import accountEditorHtml from '../modules/accounts/editor/account-editor.html';
export default function AccountsService($http, $q, ApiError, APP_CONFIG, $uibModal) {
    'ngInject';
    const HOST = APP_CONFIG.apiHost;
    const API_URL = APP_CONFIG.accountApiUrl;
    const LOGIN_API_URL = APP_CONFIG.loginApiUrl;
    return {
        getAccounts: getAccounts,
        getAccount: getAccount,
        saveAccount: saveAccount,
        deleteAccount: deleteAccount,
        openEditor: openEditor,
        login: login
    };

    function getAccounts() {
        var defer = $q.defer();
        var url = HOST + API_URL;
        $http.get(url)
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }

    function getAccount(id) {
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

    function saveAccount(account) {
        var defer = $q.defer();
        var url = HOST + API_URL;
        var promise = {};
        if (angular.isDefined(account.id)) {
            promise = $http.put(url, account);
        } else {
            promise = $http.post(url, account);
        }
        promise.then((res) => {
            defer.resolve(res.data);
        }).catch((error) => {
            defer.reject(new ApiError(error.error_message, error.code));
        });
        return defer.promise;
    }

    function deleteAccount(id) {
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

    function openEditor(accountId) {
        var editor = $uibModal.open({
            templateUrl: accountEditorHtml,
            size: 'lg',
            keyboard: true,
            controller: 'AccountEditorCtrl',
            controllerAs: 'vm',
            resolve: {
                accountId: function () {
                    return accountId;
                }
            },
            windowClass: 'modal-custom'
        });

        return editor;
    }

    function login(account) {
        var defer = $q.defer();
        var url = HOST + LOGIN_API_URL;
        var promise = {};
        promise = $http.post(url, account);
        promise.then((res) => {
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