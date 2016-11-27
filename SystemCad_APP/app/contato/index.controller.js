(function () {
    'use strict';

    angular
        .module('app')
        .controller('Contato.IndexController', Controller);

    function Controller($window, ContatoService, FlashService) {
        var vm = this;

        vm.nome = null;
        vm.saveContato = saveContato;
        vm.deleteContato = deleteContato;

        initController();

        function initController() {
            ContatoService.GetCurrent().then(function (nome) {
                vm.nome = nome;
            });
        }

        function saveContato() {
            ContatoService.Update(vm.nome)
                .then(function () {
                    FlashService.Success('Contato Atualizado.');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteContato() {
            ContatoService.Delete(vm.nome._id)
                .then(function () {
                    // log user out
                    $window.location = '/contato';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();
