var config = require('config.json');
var express = require('express');
var router = express.Router();
var contatoService = require('services/contato.service');

// routes
router.post('/register', registerContato);
router.get('/current', getCurrentContato);
router.get('/all', getAll);
router.put('/:_id', updateContato);
router.delete('/:_id', deleteContato);

module.exports = router;

function registerContato(req, res) {
    contatoService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentContato(req, res) {
     contatoService.getById(req.nome.sub)
        .then(function (nome) {
            if (nome) {
                res.send(nome);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req,res){
     contatoService.getAll()
        .then(function (contatos) {
            if (contatos) {
                res.json(contatos);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateContato(req, res) {
    var nomeId = req.nome.sub;

    contatoService.update(nomeId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteContato(req, res) {
    var nomeId = req.nome.sub;

    contatoService.delete(nomeId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
