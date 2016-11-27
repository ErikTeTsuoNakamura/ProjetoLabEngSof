var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    //res.render('register');
    res.render('contato');
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/contatos/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('contato', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('contato', {
                error: response.body,
                nome: req.body.nome
            });
        }

        // return to login page with success message
        req.session.success = 'Gravado com Sucesso';
        return res.redirect('/login');
    });
});

module.exports = router;
