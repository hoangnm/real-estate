import angular from 'angular';
import 'angular-mocks/angular-mocks';
import faker from 'faker';

var mockApi = angular.module('app.mock_api', ['ngMockE2E']);

function generateProducts(n) {
    var data = [];
    for (var i = 0; i < n; i++) {
        data.push({
            "id": faker.random.uuid(),
            "created_date": faker.date.past(),
            "modified_date": faker.date.past(),
            "product_name": faker.commerce.productName(),
            "image_url": faker.image.imageUrl(),
            "address": faker.address.streetAddress(),
            "manager_name": faker.name.findName(),
            "phone_number": faker.phone.phoneNumber(),
            "website_url": faker.internet.url(),
            "assignees": [
                faker.name.findName(),
                faker.name.findName()
            ],
            "description": faker.lorem.sentences(),
            "direction": faker.lorem.word(),
            "structure": faker.lorem.sentences(),
            "building_area": faker.finance.amount(),
            "rating": faker.finance.amount(),
            "rentable_area": faker.finance.amount(),
            "rent_price": faker.finance.amount(),
            "full_rent_price": faker.finance.amount(),
            "rent_duration": faker.finance.amount(),
            "payment_method": faker.lorem.sentences(),
            "full_block": faker.lorem.sentences(),
            "ground_floor": faker.finance.amount(),
            "furniture": faker.finance.amount(),
            "services_fees": faker.finance.amount(),
            "motor_parking_fee": faker.finance.amount(),
            "car_parking_fee": faker.finance.amount(),
            "overtime_fee": faker.finance.amount(),
            "electric_bill": faker.finance.amount(),
            "water_bill": faker.finance.amount(),
            "deposit": faker.finance.amount(),
            "brokerage_fee": faker.finance.amount(),
            "latitude": faker.address.latitude(),
            "longitude": faker.address.longitude()
        });
    }
    return data;
}


function generateCustomers(n) {
    var data = [];
    for (var i = 0; i < n; i++) {
        data.push({
            "id": faker.random.uuid(),
            "created_date": faker.date.past(),
            "modified_date": faker.date.past(),
            "created_by": faker.name.findName(),
            "modified_by": faker.name.findName(),
            "full_name": faker.name.findName(),
            "phone": faker.phone.phoneNumber(),
            "email": faker.internet.email(),
            "demand": faker.lorem.sentences(),
            "status": faker.lorem.word(),
            "customer_care_progress": faker.lorem.sentences(),
            "staff_care": faker.name.findName(),
            "company": faker.name.findName(),
        });
    }
    return data;
}

mockApi.run(function ($httpBackend) {
    // $httpBackend.whenGET('/products').respond(function (method, url, data) {
    //     var products = generateProducts(100);
    //     return [200, products, {}];
    //     //return [401, {}, {}];
    // });

    // $httpBackend.whenGET(/\/products\/\d+/).respond(function (method, url, data) {

    //     var product = generateProducts(1);

    //     return [200, product[0], {}];
    // });
    $httpBackend.whenGET(/api\/\w+.*/).passThrough();
    $httpBackend.whenPUT(/api\/\w+.*/).passThrough();
    $httpBackend.whenPOST(/api\/\w+.*/).passThrough();
    $httpBackend.whenDELETE(/api\/\w+.*/).passThrough();

    // $httpBackend.whenPOST('/products').respond(function (method, url, data) {
    //     var productId = faker.random.uuid();

    //     return [201, productId];
    // });

    // $httpBackend.whenPUT('/products').respond(function (method, url, data) {
    //     var productId = faker.random.uuid();

    //     return [200, productId];
    // });

    // $httpBackend.whenDELETE(/\/products\/\d+/).respond(function (method, url, data) {

    //     return [204, {}, {}];
    // });

    // $httpBackend.whenPOST('/products/import').respond(function (method, url, data) {
    //     var productId = faker.random.uuid();

    //     return [200, productId];
    // });


    // $httpBackend.whenGET('/customers').respond(function (method, url, data) {
    //     var customers = generateCustomers(50);
    //     return [200, customers, {}];
    //     //return [401, {}, {}];
    // });

    // $httpBackend.whenGET(/\/customers\/\d+/).respond(function (method, url, data) {

    //     var product = generateCustomers(1);

    //     return [200, product[0], {}];
    // });
});

export default mockApi.name;