const path = require('path');
const multer = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

const models = require('../models');
const upload = require('../helpers/upload');
const ApiError = require('../errors/api-error');

const DEFAULT_SORT_FIELD = 'updated_at DESC';
const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

const api = {};

api.getCustomers = (query) => {
    query = query || {};
    const options = buildQueryOptions(query);
    const promise = new Promise((resolve, reject) => {
        models.Customer.findAndCountAll(options)
            .then((res) => {
                resolve({
                    data: res.rows,
                    total: res.count
                });
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

api.getCustomer = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.Customer.findById(id,
            {
                include: buildInclude()
            }).then((customer) => {
                resolve(customer);
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

api.saveCustomer = (data) => {
    const assignees = mapAssignees(data.assignees);
    const promise = new Promise((resolve, reject) => {
        let customerSaved = null;
        models.Customer.findOrCreate({
            where: {
                id: data.id
            },
            defaults: data
        }).then((res) => {
            const customer = res[0];
            const isCreated = res[1];
            if (!isCreated) {
                return customer.update(data);
            }
            return customer;
        }).then((customer) => {
            customerSaved = customer;
            return customerSaved.getAssignees();
        }).then((res) => customerSaved.removeAssignees(res))
            .then(() => customerSaved.addAssignees(assignees))
            .then(() => {
                resolve(customerSaved);
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

function mapAssignees(assignees) {
    let mappedAssignees = assignees || [];
    mappedAssignees = mappedAssignees.filter((item) => item.id)
        .map((item) => {
            const account = models.Account.build({
                id: item.id
            });
            return account;
        });
    return mappedAssignees;
}

api.deleteCustomer = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.Customer.findById(id)
            .then((customer) => {
                if (!customer) {
                    return reject(new ApiError('ER_ITEM_NOT_FOUND', 'Item not found'));
                }
                return customer.destroy();
            }).then(() => {
                resolve();
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};


api.deleteCustomers = (arrId) => {
    const promise = new Promise((resolve, reject) => {
        models.Customer.destroy(
            {
                where: { id: arrId }
            }
        ).then((res) => {
            resolve(res);
        }).catch((err) => {
            const serializedError = ApiError.handleError(err);
            reject(serializedError);
        });
    });
    return promise;
};


api.importCustomersFromExcel = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        var exceltojson;
        upload.readDataFromExcel(req, res)
            .then((data) => updateCustomers(data))
            .then((customers) => {
                resolve(customers);
            }).catch((err) => {
                reject(new ApiError(err.code, err.message));
            });
    });
    return promise;
};

function updateCustomers(data) {
    data = data || [];
    const promises = [];
    data.forEach((item, index) => {
        if (item.customer_code) {
            promises.push(models.Customer.findOrCreate({
                where: {
                    customer_code: item.customer_code
                },
                defaults: item
            }));
        }
    });
    return Promise.all(promises);
}

function buildQueryOptions(query) {
    const options = {
        offset: query.offset ? parseInt(query.offset, 10) : DEFAULT_OFFSET,
        limit: query.limit ? parseInt(query.limit, 10) : DEFAULT_LIMIT,
        order: query.order || DEFAULT_SORT_FIELD
    };
    const whereFilters = handleFilters(query.filters);
    if (whereFilters) {
        options.where = whereFilters;
    }
    options.include = buildInclude();
    if (options.where && options.where.assignees) {
        options.include[0].where = { id: options.where.assignees };
        delete options.where.assignees;
    }
    return options;
}

function buildInclude() {
    return [
        {
            model: models.Account,
            as: 'assignees',
            through: {
                attributes: []
            },
            attributes: ['id', 'full_name', 'email']
        },
        {
            model: models.CustomerStatus,
            as: 'customer_status',
            attributes: ['id', 'status_name']
        }
    ];
}

function handleFilters(filters) {
    filters = filters || '';
    const arrFilters = filters.split(';');
    let where = null;
    arrFilters.forEach((a) => {
        where = where || {};
        const q = a.split(':');
        if (q.length === 2) {
            if (q[0] === 'full_name' || q[0] === 'phone_number') {
                where[q[0]] = {
                    $like: '%' + q[1] + '%'
                };
            } else {
                where[q[0]] = q[1];
            }
        }
    });
    return where;
}

module.exports = api;