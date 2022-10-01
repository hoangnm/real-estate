export default function ProductsCtrl(NgTableParams, productsService, modalConfirmService,
    $translate, Notification, locationService, accountsService) {
    'ngInject';

    const vm = this;
    vm.peopleSelected = {};
    vm.houseTypeselected = {};
    vm.searchOption = {};
    vm.isLoading = true;

    vm.staffs = [];

    vm.houseType = [
        { name: 'Tầng trệt' },
        { name: 'Nguyên căn' },
        { name: 'Nội thất' }
    ];

    vm.cities = [];
    vm.districts = [];
    vm.wards = [];

    vm.selectAll = false;

    vm.deleteProduct = function (productId) {
        var title = $translate.instant('CONFIRM.DELETE_PRODUCT_CONFIRM_TITLE');
        var mes = $translate.instant('CONFIRM.DELETE_PRODUCT_CONFIRM_MES');
        var confirm = {
            message: mes,
            title: title
        };
        const editor = modalConfirmService.openModelConfirm(confirm);
        editor.result.then((res) => {
            if (res) {
                productsService.deleteProduct(productId).then((res) => {
                    Notification.success($translate.instant('NOTIFICATION.DELETE_PRODUCT_SUCCESS'));
                    getProducts();
                }, function () {
                    Notification.error($translate.instant('NOTIFICATION.DELETE_PRODUCT_ERROR'));
                });
            }
        });

    };

    vm.uploadFile = function (file, errFiles) {
        if (!file) {
            return Notification.error($translate.instant('NOTIFICATION.IMPORT_PRODUCT_ERROR'));
        }
        vm.isLoading = true;
        productsService.uploadFile(file).then((response) => {
            Notification.success($translate.instant('NOTIFICATION.IMPORT_PRODUCT_SUCCESS'));
            getProducts();
        }, () => {
            Notification.error($translate.instant('NOTIFICATION.IMPORT_PRODUCT_ERROR'));
        }).finally(() => {
            vm.isLoading = false;
        });
    };

    vm.$onInit = function () {
        init();
    };

    vm.searchProduct = function () {
        const searchOption = buildParamFilter();
        getProducts(searchOption);
    };

    vm.clearSearch = function () {
        vm.searchOption = {};
        vm.rentable_area_from = '';
        vm.rentable_area_to = '';
        vm.rent_price_from = '';
        vm.rent_price_to = '';
        getProducts();
    };

    vm.openEditor = function (productId) {
        const editor = productsService.openEditor(productId);
        editor.result.then((res) => {
            if (res) {
                getProducts();
            }
        });
    };

    vm.hasItemsChecked = function () {
        const hasItemChecked = vm.tableParams.data.some((item) => item.checked);
        return !hasItemChecked;
    };

    vm.deleteItems = function () {
        var title = $translate.instant('CONFIRM.DELETE_PRODUCT_CONFIRM_TITLE');
        var mes = $translate.instant('CONFIRM.DELETE_PRODUCTS_CONFIRM_MES');
        var confirm = {
            message: mes,
            title: title
        };
        const editor = modalConfirmService.openModelConfirm(confirm);
        editor.result.then((res) => {
            if (res) {
                vm.isLoading = true;
                const products = [];

                vm.tableParams.data.forEach((item) => {
                    if (item.checked) {
                        products.push(item.id);
                    }
                });

                productsService.deleteProducts(products).then((response) => {
                    Notification.success($translate.instant('NOTIFICATION.DELETE_PRODUCT_SUCCESS'));
                    getProducts();
                }, () => {
                    Notification.error($translate.instant('NOTIFICATION.DELETE_PRODUCT_ERROR'));
                }).finally(() => {
                    vm.isLoading = false;
                });
            }
        });

    };

    vm.selectedItems = function () {
        vm.tableParams.data.forEach((item) => {
            item.checked = !vm.selectAll;
        });
    };

    function init() {
        getProducts();
        getLocations();
        getAllStaff();
    }

    function getProducts(options) {
        vm.isLoading = true;
        if (!options) {
            options = {};
        }
        vm.tableParams = new NgTableParams({}, {
            getData: function (params) {
                options.limit = params.count();
                options.offset = params.count() * (params.page() - 1);
                return productsService.getProducts(options).then((res) => {
                    params.total(res.total);
                    return res.data;
                }).finally(() => {
                    vm.isLoading = false;
                });
            }
        });
    }

    function buildParamFilter() {
        const options = {};
        vm.searchOption.rent_price = null;
        vm.searchOption.rentable_area = null;
        if (vm.rent_price_from && vm.rent_price_to) {
            vm.searchOption.rent_price = '(' + vm.rent_price_from + ',' + vm.rent_price_to + ')';
        } else {
            if (vm.rent_price_from) {
                vm.searchOption.rent_price = '(' + vm.rent_price_from + ')';
            }
            if (vm.rent_price_to) {
                vm.searchOption.rent_price = '(0,' + vm.rent_price_to + ')';
            }
        }

        if (vm.rentable_area_from && vm.rentable_area_to) {
            vm.searchOption.rentable_area = '(' + vm.rentable_area_from + ',' + vm.rentable_area_to + ')';
        } else {
            if (vm.rentable_area_from) {
                vm.searchOption.rentable_area = '(' + vm.rentable_area_from + ')';
            }
            if (vm.rentable_area_to) {
                vm.searchOption.rentable_area = '(0,' + vm.rentable_area_to + ')';
            }
        }
        const filters = productsService.buildParamFilter(vm.searchOption);
        if (filters) {
            options.filters = filters;
        }
        return options;
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