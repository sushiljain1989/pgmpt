const useRoutes = (app) => {
    const { InternalUsers } = require("../controllers/InternalUserController");
    const { Projects } = require("../controllers/ProjectsController");

    /* Routes for internal users */
    app.post('/api/internal_users', InternalUsers.create);
    app.get('/api/internal_users', InternalUsers.findAll);
    app.get('/api/internal_users/:id', InternalUsers.findOne);
    app.put('/api/internal_users/:id', InternalUsers.update);
    app.delete('/api/internal_users/:id', InternalUsers.delete);

    /* Routes for projects */
    app.post('/api/projects', Projects.create);
    app.get('/api/projects', Projects.findAll);
    app.get('/api/projects/:id', Projects.findOne);
    app.put('/api/projects/:id', Projects.update);
    app.delete('/api/projects/:id', Projects.delete);

    app.get('/', (req, res) => res.send('Hello world'));
}

module.exports = useRoutes;
