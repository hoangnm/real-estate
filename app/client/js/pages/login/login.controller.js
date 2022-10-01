import angular from 'angular';
export default function LoginCtrl($state, $sessionStorage, accountsService) {
    'ngInject';

    const vm = this;
    vm.account = {};
    vm.showError = false;
    vm.$onInit = function () {
        init();
    };

    function init() {

    }

    vm.login = function () {
        accountsService.login(vm.account).then((user) => {
            if (user) {
                $sessionStorage.user = user;
                $state.go('management', null, { location: 'replace' });
            } else {
                vm.showError = true;
            }
        }, () => {
            vm.showError = true;
        });
    };

}