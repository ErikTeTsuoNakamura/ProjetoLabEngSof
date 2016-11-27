(function () {
    'use strict';

    angular
        .module('app')
        .factory('ContatoService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/contatos/current').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/contatos/all').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/contatos/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(nome) {
            return $http.get('/api/contatos/' + nome).then(handleSuccess, handleError);
        }

        function Create(nome) {
            return $http.post('/api/contatos/register', nome).then(handleSuccess, handleError);
        }

        function Update(nome) {
            return $http.put('/api/contatos/' + nome._id, nome).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/contatos/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
