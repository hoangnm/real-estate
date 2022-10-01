export default function CustomersCtrl(NgTableParams, customersService, $translate,
    Notification, modalConfirmService) {
    'ngInject';

    const vm = this;
    vm.isLoading = false;
    vm.searchOption = {
        status: null
    };

    vm.status = [];
    vm.$onInit = function () {
        init();
        getCustomerStatus();
    };

    vm.searchCustomer = function () {
        const options = buildParamFilter();
        getCustomers(options);
    };

    vm.clearSearch = function () {
        vm.searchOption = {};
        getCustomers();
    };

    vm.deleteCustomer = function (customerId) {
        var title = $translate.instant('CONFIRM.DELETE_CUSTOMER_CONFIRM_TITLE');
        var mes = $translate.instant('CONFIRM.DELETE_CUSTOMER_CONFIRM_MES');
        var confirm = {
            message: mes,
            title: title
        };
        var editor = modalConfirmService.openModelConfirm(confirm);
        editor.result.then((res) => {
            if (res) {
                customersService.deleteCustomer(customerId).then((res) => {
                    Notification.success($translate.instant('NOTIFICATION.DELETE_CUSTOMER_SUCCESS'));
                    getCustomers();
                }, function () {
                    Notification.error($translate.instant('NOTIFICATION.DELETE_CUSTOMER_ERROR'));
                });
            }
        });
    };

    vm.hasItemsChecked = function () {
        const hasItemChecked = vm.tableParams.data.some((item) => item.checked);
        return !hasItemChecked;
    };

    vm.deleteItems = function () {
        var title = $translate.instant('CONFIRM.DELETE_CUSTOMER_CONFIRM_TITLE');
        var mes = $translate.instant('CONFIRM.DELETE_CUSTOMERS_CONFIRM_MES');
        var confirm = {
            message: mes,
            title: title
        };
        const editor = modalConfirmService.openModelConfirm(confirm);
        editor.result.then((res) => {
            if (res) {
                vm.isLoading = true;
                const customers = [];

                vm.tableParams.data.forEach((item) => {
                    if (item.checked) {
                        customers.push(item.id);
                    }
                });

                customersService.deleteCustomers(customers).then((response) => {
                    Notification.success($translate.instant('NOTIFICATION.DELETE_CUSTOMER_SUCCESS'));
                    getCustomers();
                }, () => {
                    Notification.error($translate.instant('NOTIFICATION.DELETE_CUSTOMER_ERROR'));
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

    vm.uploadFile = function (file) {
        if (!file) {
            return Notification.error($translate.instant('NOTIFICATION.IMPORT_CUSTOMER_ERROR'));
        }
        vm.isLoading = true;
        customersService.uploadFile(file).then((response) => {
            Notification.success($translate.instant('NOTIFICATION.IMPORT_CUSTOMER_SUCCESS'));
            getCustomers();
        }, function (response) {
            Notification.error($translate.instant('NOTIFICATION.IMPORT_CUSTOMER_ERROR'));
        }).finally(function () {
            vm.isLoading = false;
        });
    };

    function init() {
        getCustomers();
    }

    function getCustomers(options) {
        vm.isLoading = true;
        if (!options) {
            options = {};
        }
        vm.tableParams = new NgTableParams({}, {
            getData: function (params) {
                options.limit = params.count();
                options.offset = params.count() * (params.page() - 1);
                return customersService.getCustomers(options).then((res) => {
                    params.total(res.total);
                    return res.data;
                }).finally(function () {
                    vm.isLoading = false;
                });
            }
        });
    }

    function getCustomerStatus() {
        customersService.getCustomerStatus().then((res) => {
            vm.status = res;
        });
    }

    vm.openEditor = function (customerId) {
        const editor = customersService.openEditor(customerId);
        editor.result.then((res) => {
            getCustomers();
        });
    };

    function buildParamFilter() {
        const options = {};
        const filters = customersService.buildParamFilter(vm.searchOption);
        if (filters) {
            options.filters = filters;
        }
        return options;
    }
}