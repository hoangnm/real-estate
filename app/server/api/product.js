const os = require('os');

const APP_CONFIG = require('config').appConfig;
const models = require('../models');
const upload = require('../helpers/upload');
const ApiError = require('../errors/api-error');

const DEFAULT_SORT_FIELD = 'updated_at DESC';
const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

const api = {};

api.getProducts = (query) => {
    query = query || {};
    const options = buildQueryOptions(query);
    const promise = new Promise((resolve, reject) => {
        models.Product.findAndCountAll(options)
            .then((res) => {
                let products = res.rows;
                products = products.map((item) => {
                    const product = item.toJSON();
                    product.image_url = product.image_url ? '//' + os.hostname() + ':' + APP_CONFIG.port + '/' + item.get('image_url') : null;
                    return product;
                });
                resolve({
                    data: products,
                    total: res.count
                });
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

api.getProduct = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.Product.findById(id, { include: buildInclude() })
            .then((product) => {
                const productJSON = product.toJSON();
                productJSON.image_url = productJSON.image_url ? '//' + os.hostname() + ':' + APP_CONFIG.port + '/' + product.get('image_url') : null;
                resolve(product);
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

api.saveProduct = (data) => {
    const assignees = mapAssignees(data.assignees);
    const promise = new Promise((resolve, reject) => {
        let productSaved = null;
        models.Product.findOrCreate({
            where: {
                id: data.id
            },
            defaults: data
        }).then((res) => {
            const product = res[0];
            const isCreated = res[1];
            if (!isCreated) {
                return product.update(data);
            }
            return product;
        }).then((product) => {
            productSaved = product;
            return product.getAssignees();
        }).then((res) => productSaved.removeAssignees(res))
            .then(() => productSaved.addAssignees(assignees))
            .then(() => {
                resolve(productSaved);
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

api.deleteProduct = (id) => {
    const promise = new Promise((resolve, reject) => {
        models.Product.findById(id)
            .then((product) => {
                if (!product) {
                    return reject(new ApiError('ER_ITEM_NOT_FOUND', 'Item not found'));
                }
                return product.destroy();
            }).then(() => {
                resolve();
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
};

api.deleteProducts = (arrId) => {
    const promise = new Promise((resolve, reject) => {
        models.Product.destroy(
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

api.uploadImage = (request, response) => {
    const promise = new Promise((resolve, reject) => {
        upload.uploadImage(request, response)
            .then((file) => updateProductImage(request.params.id, file.filename))
            .then((product) => {
                resolve(product);
            }).catch((err) => {
                reject(err);
            });
    });
    return promise;
};

function updateProductImage(id, fileName) {
    const promise = new Promise((resolve, reject) => {
        models.Product.findById(id)
            .then((product) => {
                if (!product) {
                    return reject(new ApiError('ER_ITEM_NOT_FOUND', 'Item not found'));
                }
                return product.update({ image_url: fileName });
            }).then((product) => {
                resolve(product);
            }).catch((err) => {
                const serializedError = ApiError.handleError(err);
                reject(serializedError);
            });
    });
    return promise;
}

api.importProductsFromExcel = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        var exceltojson;
        upload.readDataFromExcel(req, res)
            .then((data) => updateProducts(data))
            .then((products) => {
                resolve(products);
            }).catch((err) => {
                reject(new ApiError(err.code, err.message));
            });
    });
    return promise;
};

function updateProducts(data) {
    data = data || [];
    const promises = [];
    data.forEach((item, index) => {
        if (item.product_code) {
            promises.push(models.Product.findOrCreate({
                where: {
                    product_code: item.product_code
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
            model: models.Account,
            as: 'created_by',
            attributes: ['id', 'full_name', 'email']
        },
        {
            model: models.Account,
            as: 'updated_by',
            attributes: ['id', 'full_name', 'email']
        },
        {
            model: models.District,
            as: 'district',
            attributes: ['id', 'district_name']
        },
        {
            model: models.Ward,
            as: 'ward',
            attributes: ['id', 'ward_name']
        },
        {
            model: models.City,
            as: 'city',
            attributes: ['id', 'city_name']
        }];
}

function handleFilters(filters) {
    filters = filters || '';
    const arrFilters = filters.split(';');
    let where = null;
    arrFilters.forEach((a) => {
        where = where || {};
        const q = a.split(':');
        if (q.length === 2) {
            if (q[0] === 'product_name' || q[0] === 'address') {
                where[q[0]] = {
                    $like: '%' + q[1] + '%'
                };
            } else if (q[0] === 'rentable_area' || q[0] === 'rent_price') {
                const values = q[1].match(/(\d+)/g) || [];
                const defaultFromValue = '0';
                const defaultToValue = '1000';
                const column = models.Product.sequelize.col(q[0]);
                const fromValue = parseInt(values[0] || defaultFromValue, 10);
                const toValue = parseInt(values[1] || defaultToValue, 10);
                where.$col = models.sequelize.where(models.sequelize.fn('CHECKBETWEEN', column, fromValue, toValue), 1);
            } else {
                where[q[0]] = q[1];
            }
        }
    });
    return where;
}

module.exports = api;