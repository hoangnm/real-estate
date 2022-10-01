import angular from 'angular';
import imagedefault from '../../../../img/building-default.jpg';
export default function ProductEditorCtrl(productsService, productId, $uibModalInstance, GeoCoder,
    Notification, $translate, APP_CONFIG, locationService, accountsService) {
    'ngInject';


    const vm = this;
    vm.isLoading = false;
    vm.productId = productId;
    vm.image = imagedefault;
    vm.cities = [];
    vm.districts = [];
    vm.wards = [];

    vm.staffs = [];

    vm.$onInit = function () {
        init();
    };

    vm.cancel = function () {
        $uibModalInstance.close(false);
    };

    vm.save = function () {
        vm.isLoading = true;
        const product = angular.copy(vm.product);
        if (product.assignees && product.assignees.length > 0) {
            product.assignees = product.assignees.map((obj) => {
                const rObj = {};
                rObj.id = obj;
                return rObj;
            });
        }


        const address = getFullAddress();

        GeoCoder.geocode({ address: address }).then((result) => {
            product.latitude = result[0].geometry.location.lat();
            product.longitude = result[0].geometry.location.lng();
        }).finally(() => {
            productsService.saveProduct(product).then((res) => {
                if (vm.productId > 0) {
                    Notification.success($translate.instant('NOTIFICATION.UPDATE_PRODUCT_SUCCESS'));
                } else {
                    Notification.success($translate.instant('NOTIFICATION.CREATE_PRODUCT_SUCCESS'));
                }
                vm.product.id = res.id;
                saveFiles();
            }).catch((error) => {
                if (vm.productId > 0) {
                    Notification.error($translate.instant('NOTIFICATION.UPDATE_PRODUCT_ERROR'));
                } else {
                    Notification.error($translate.instant('NOTIFICATION.CREATE_PRODUCT_ERROR'));
                }
            }).finally(() => {
                vm.isLoading = false;
                $uibModalInstance.close(true);
            });

        });

    };

    function init() {
        getProduct();
        getLocations();
        getAllStaff();
    }

    function getFullAddress() {
        let address = '';
        address = vm.product.address;
        if (getWardName()) {
            address += ', ' + getWardName();
        }
        if (getDistrictName()) {
            address += ', ' + getDistrictName();
        }
        if (getCityName()) {
            address += ', ' + getCityName();
        }
        return address;
    }

    function getCityName() {

        const city = vm.cities.find((o) => o.id === vm.product.city_id);
        return city.city_name;
    }

    function getDistrictName() {
        const district = vm.districts.find((o) => o.id === vm.product.district_id);
        return district.district_name;
    }

    function getWardName() {
        const ward = vm.wards.find((o) => o.id === vm.product.ward_id);
        return ward.ward_name;
    }

    function getProduct() {
        if (!productId) {
            return;
        }
        vm.isLoading = true;
        productsService.getProduct(productId).then((res) => {
            vm.product = res;
            if (vm.product && vm.product.image_url) {
                vm.image = vm.product.image_url;
            }
        }).finally(function () {
            vm.isLoading = false;
        });
    }

    vm.uploadFile = function (file) {
        if (!file) {
            return Notification.error($translate.instant('NOTIFICATION.UPLOAD_IMAGE_ERROR'));
        }
        vm.file = file;
        vm.image = file;
    };

    function saveFiles() {
        if (!vm.file) {
            return;
        }
        productsService.uploadImage(vm.file, vm.product.id).then((response) => {
            vm.file.result = response.data;
        }, (response) => {
            if (response.status > 0)
                vm.errorMsg = response.status + ': ' + response.data;
        });

    }

    function getLocations() {
        locationService.getCities().then((cities) => {
            vm.cities = cities;
        });
        locationService.getDistricts().then((districts) => {
            vm.districts = districts;
        });
        locationService.getWards().then((wards) => {
            vm.wards = wards;
        });
    }

    function getAllStaff() {
        accountsService.getAccounts().then((res) => {
            vm.staffs = res;
        });
    }

}