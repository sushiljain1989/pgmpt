const model = require("../models/ProjectsModel");

const Projects = {};

Projects.create = function (req, res) {
    if(!req.body){
        res.status(400).send({ message: 'Bad Request' })
    }

    model.create( req.body, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while create a new project'});
        }
        res.send( data );
    });
};

Projects.findAll = function (req, res) {
    const data = {
        limit: req.body.limit || 20,
        skip: req.body.skip || 0
    }
    model.fetchAll( data, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while fetching projects'});
        }
        res.send( data );
    });
};

Projects.findOne = function (req, res) {

    model.fetchOne( {id: req.params.id}, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while fetching project'});
        }
        res.send( data );
    });
};

Projects.update = function (req, res) {
    if(!req.params.id){
        res.status(400).send({ message: 'Missing ID attribute' })
    }
    model.update( req.body, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while updating project'});
        }
        res.send( data );
    });
};

Projects.delete = function (req, res) {
    if(!req.body){
        res.status(400).send({ message: 'Bad Request' })
    }
    if(!req.params.id){
        res.status(400).send({ message: 'Missing ID attribute' })
    }
    model.delete( {id: req.params.id}, (err, data) => {
        if( err ){
            res.status(500, {message: 'error occurred while deleting project'});
        }
        res.send( data );
    });
};

module.exports.Projects = Projects;
