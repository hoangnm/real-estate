import angular from 'angular';

export default function LocationService($http, $q, ApiError, APP_CONFIG) {
    'ngInject';
    const HOST = APP_CONFIG.apiHost;
    const CITY_API_URL = APP_CONFIG.cityApiUrl;
    const DISTRICT_API_URL = APP_CONFIG.districtApiUrl;
    const WARD_API_URL = APP_CONFIG.wardApiUrl;
    return {
        getCities: getCities,
        getDistricts: getDistricts,
        getWards: getWards

    };


    function getCities() {
        var defer = $q.defer();
        var url = HOST + CITY_API_URL;
        $http.get(url)
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }

    function getDistricts() {
        var defer = $q.defer();
        var url = HOST + DISTRICT_API_URL;
        $http.get(url)
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }

    function getWards() {
        var defer = $q.defer();
        var url = HOST + WARD_API_URL;
        $http.get(url)
            .then((res) => {
                defer.resolve(res.data);
            }).catch((error) => {
                defer.reject(new ApiError(error.error_message, error.code));
            });
        return defer.promise;
    }

}