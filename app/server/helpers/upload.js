const path = require('path');
const multer = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

const ApiError = require('../errors/api-error');

const api = {};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileExtension = getFileExtension(file);
        let destinationPath = '../uploads';
        if (['xls', 'xlsx'].indexOf(fileExtension) > -1) {
            destinationPath += '/excel';
        } else if (['png', 'jpg'].indexOf(fileExtension) > -1) {
            destinationPath += '/images';
        }
        cb(null, path.resolve(__dirname, destinationPath));
    },
    filename: (req, file, cb) => {
        const datetimestamp = Date.now();
        const fileExtension = getFileExtension(file);
        let fileType = 'file';
        if (['jpg', 'png'].indexOf(fileExtension) === -1) {
            fileType = 'image';
        }
        cb(null, fileType + '-' + datetimestamp + '.' + fileExtension);
    }
});

const uploadExcel = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileExtension = getFileExtension(file);
        if (['xls', 'xlsx'].indexOf(fileExtension) === -1) {
            return cb(new Error('Wrong extension type'));
        }
        cb(null, true);
    }
}).single('file');

const uploadImage = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileExtension = getFileExtension(file);
        if (['png', 'jpg'].indexOf(fileExtension) === -1) {
            return cb(new Error('Wrong extension type'));
        }
        cb(null, true);
    }
}).single('file');

function getFileExtension(file) {
    var extension = file.originalname.split('.')[file.originalname.split('.').length - 1];
    return extension && extension.toLowerCase();
}

api.uploadImage = (request, response) => {
    const promise = new Promise((resolve, reject) => {
        uploadImage(request, response, (err) => {
            if (err) {
                return reject(new ApiError(err.code, err.message));
            }
            if (!request.file) {
                return reject(new ApiError('ER_NO_FILE', 'No file passed'));
            }
            resolve(request.file);
        });
    });
    return promise;
};

api.readDataFromExcel = (req, res) => {
    const promise = new Promise((resolve, reject) => {
        var exceltojson;
        uploadExcel(req, res, (err) => {
            if (err) {
                return reject(new ApiError(err.code, err.message));
            }
            if (!req.file) {
                return reject(new ApiError('ER_NO_FILE', 'No file passed'));
            }
            if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            exceltojson({
                input: req.file.path,
                output: null,
                lowerCaseHeaders: true
            }, (err, result) => {
                if (err) {
                    return reject(new ApiError(err.code, err.message));
                }
                result = result || [];
                resolve(result);
            });
        });
    });
    return promise;
};


module.exports = api;