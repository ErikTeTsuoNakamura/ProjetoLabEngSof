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
        vm.listaContatos = listaContatos;

        initController();

        function initController() {
              listaContatos(); 
        }

        function saveContato() {
            ContatoService.Create(vm.nome)
                .then(function () {
                    FlashService.Success('Contato Atualizado.');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function atualizaContato() {
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

        function listaContatos() {
            ContatoService.GetAll().then(function (retorno){
                vm.listaContatos = retorno.contatos;
            });
        }
    }

})();
