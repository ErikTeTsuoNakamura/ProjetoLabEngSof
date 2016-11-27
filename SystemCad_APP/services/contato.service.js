var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('contatos');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


function getById(_id) {
    var deferred = Q.defer();

    db.contatos.findById(_id, function (err, nome) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (nome) {
            deferred.resolve(_.omit(nome));
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
        var deferred = Q.defer();

    db.contatos.find({}, function (err, contatos) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (contatos) {
            deferred.resolve(_.omit(contatos));
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(nomeParam) {
    var deferred = Q.defer();

    db.contatos.findOne(
        { nome: nomeParam.nome },
        function (err, nome) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (nome) {
                deferred.reject('Contato "' + nomeParam.nome + '" já está cadastrado.');
            } else {
                createContato();
            }
        });


    function createContato() {

        var nome = _.omit(nomeParam);

        db.contatos.insert(
            nome,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, nomeParam) {
    var deferred = Q.defer();

    // validation
    db.contatos.findById(_id, function (err, nome) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (nome.nome !== nomeParam.nome) {

            db.contatos.findOne(
                { nome: nomeParam.nome },
                function (err, nome) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (nome) {
                        deferred.reject('Contato "' + req.body.nome + '" já existe.')
                    } else {
                        updateContato();
                    }
                });
        } else {
            updateContato();
        }
    });

    function updateContato() {

        var set = {
            nome: nomeParam.nome,
        };

        db.contatos.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.contatos.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
