const model = require("../models/ClientsModel");

const Clients = {};

Clients.create = function (req, res) {
    if(!req.body){
        res.status(400).send({ message: 'Bad Request' })
    }

    model.create( req.body, (err, data) => {
       if( err ){
           res.status(500, {message: 'error occurred while create a new client'});
       }
       res.send( data );
    });
};

Clients.findAll = function (req, res) {
    const data = {
        limit: req.query.limit || 20,
        skip: req.query.skip || 0
    }
    model.fetchAll( data, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while fetching clients'});
        }
        res.send( data );
    });
};

Clients.findOne = function (req, res) {

    model.fetchOne( {id: req.params.id}, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while fetching client'});
        }
        res.send( data );
    });
};

Clients.update = function (req, res) {
    if(!req.params.id){
        res.status(400).send({ message: 'Missing ID attribute' })
    }
    model.update( req.body, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while updating client info'});
        }
        res.send( data );
    });
};

Clients.delete = function (req, res) {
    if(!req.body){
        res.status(400).send({ message: 'Bad Request' })
    }
    if(!req.params.id){
        res.status(400).send({ message: 'Missing ID attribute' })
    }
    model.delete( {id: req.params.id}, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while deleting client'});
        }
        res.send( data );
    });
};

module.exports.Clients = Clients;
