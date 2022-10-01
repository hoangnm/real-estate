import imagedefault from '../../../../img/building-default.jpg';
export default function ProductCtrl(productsService, $stateParams) {
    'ngInject';

    const vm = this;
    const productId = $stateParams.id;

    vm.isLoading = true;
    vm.location = '';
    vm.zoom = 12;
    vm.$onInit = function () {
        init();
    };

    function init() {
        getProduct();
    }

    function getProduct() {
        vm.isLoading = true;
        productsService.getProduct(productId).then((res) => {
            vm.product = res;
            vm.location = vm.product.latitude + ',' + vm.product.longitude;
            vm.file = vm.product.image_url;
            if (!vm.file) {
                vm.file = imagedefault;
            }
        }).finally(function () {
            vm.isLoading = false;
        });
    }
}