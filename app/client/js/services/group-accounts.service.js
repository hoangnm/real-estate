import angular from 'angular';
import groupEditorHtml from '../modules/group-accounts/editor/group-account-editor.html';
export default function GroupService($http, $q, ApiError, APP_CONFIG, $uibModal, utils) {
    'ngInject';
    const HOST = APP_CONFIG.apiHost;
    const API_URL = APP_CONFIG.groupApiUrl;
    const DELETE = APP_CONFIG.deleteFeature;
    const APP_RESOURCE_URL = APP_CONFIG.appResourceApiUrl;
    return {
        getGroups: getGroups,
        getGroup: getGroup,
        saveGroup: saveGroup,
        deleteGroup: deleteGroup,
        deleteGroups: deleteGroups,
        openEditor: openEditor,
        getAppResources: getAppResources,
        savePermission: savePermission,
        removePermission: removePermission
    };

    function getGroups() {
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

    function getGroup(id) {
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

    function saveGroup(group) {
        var defer = $q.defer();
        var url = HOST + API_URL;
        var promise = {};
        if (angular.isDefined(group.id)) {
            promise = $http.put(url, group);
        } else {
            promise = $http.post(url, group);
        }
        promise.then((res) => {
            defer.resolve(res.data);
        }).catch((error) => {
            defer.reject(new ApiError(error.error_message, error.code));
        });
        return defer.promise;
    }

    function deleteGroup(id) {
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

    function deleteGroups(arrId) {
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


    function openEditor(groupId) {
        var editor = $uibModal.open({
            templateUrl: groupEditorHtml,
            size: 'lg',
            keyboard: true,
            controller: 'GroupEditorCtrl',
            controllerAs: 'vm',
            resolve: {
                groupId: function () {
                    return groupId;
                }
            },
            windowClass: 'modal-custom'
        });

        return editor;
    }

    function getAppResources() {
        var defer = $q.defer();
        var url = HOST + APP_RESOURCE_URL;
        $http.get(url)
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }

    function savePermission(groupId, data) {
        var defer = $q.defer();
        var url = HOST + API_URL + '/' + groupId + '/permission';
        $http.post(url, data)
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }


    function removePermission(groupId, data) {
        var defer = $q.defer();
        var url = HOST + API_URL + '/' + groupId + '/permission';
        $http.delete(url, { data: data })
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }
}