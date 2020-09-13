const model = require("../models/InternalUsersModel");

const InternalUsers = {};

InternalUsers.create = function (req, res) {
    if(!req.body){
        res.status(400).send({ message: 'Bad Request' })
    }

    model.create( req.body, (err, data) => {
       if( err ){
           res.status(500, {message: 'error occurred while create a new internal user'});
       }
       res.send( data );
    });
};

InternalUsers.findAll = function (req, res) {
    const data = {
        limit: req.body.limit || 20,
        skip: req.body.skip || 0
    }
    model.fetchAll( data, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while fetching internal users'});
        }
        res.send( data );
    });
};

InternalUsers.findOne = function (req, res) {

    model.fetchOne( {id: req.params.id}, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while fetching internal user'});
        }
        res.send( data );
    });
};

InternalUsers.update = function (req, res) {
    if(!req.params.id){
        res.status(400).send({ message: 'Missing ID attribute' })
    }
    model.update( req.body, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while updating internal user'});
        }
        res.send( data );
    });
};

InternalUsers.delete = function (req, res) {
    if(!req.body){
        res.status(400).send({ message: 'Bad Request' })
    }
    if(!req.params.id){
        res.status(400).send({ message: 'Missing ID attribute' })
    }
    model.delete( {id: req.params.id}, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while deleting internal user'});
        }
        res.send( data );
    });
};

module.exports.InternalUsers = InternalUsers;
