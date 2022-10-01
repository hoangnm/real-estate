const fs = require("fs");
const path = require("path");
const Sequelize = require('sequelize');
const sequelizeFixtures = require('sequelize-fixtures');
const config = require('config');

const DB_CONFIG = config.get('dbConfig');

const db = {};

const sequelize = new Sequelize(DB_CONFIG.name, DB_CONFIG.userName, DB_CONFIG.password, {
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    dialect: 'mysql',
    define: {
        underscored: true
    }
});

function init(done) {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            return;
        }
        files.filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
            .forEach((file) => {
                const model = sequelize.import(path.join(__dirname, file));
                db[model.name] = model;
            });
        Object.keys(db)
            .forEach((modelName) => {
                if (db[modelName].associate) {
                    db[modelName].associate(db);
                }
            });

        sequelize.sync().then((res) => {
            sequelizeFixtures.loadFile('data.json', db).then(() => {
                done();
            });
        });
    });
}


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.init = init;

module.exports = db;