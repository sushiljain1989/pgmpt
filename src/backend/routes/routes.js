const useRoutes = (app) => {
    const { InternalUsers } = require("../controllers/InternalUserController");
    const { Projects } = require("../controllers/ProjectsController");
    const { Clients } = require("../controllers/ClientsController");
    const { ProjectTasks } = require("../controllers/ProjectTasksController");

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

    /* Routes for clients */
    app.post('/api/clients', Clients.create);
    app.get('/api/clients', Clients.findAll);
    app.get('/api/clients/:id', Clients.findOne);
    app.put('/api/clients/:id', Clients.update);
    app.delete('/api/clients/:id', Clients.delete);

    /* Routes for projects */
    app.post('/api/project_tasks', ProjectTasks.create);
    app.get('/api/projects/:projectId/tasks', ProjectTasks.findAll);
    app.get('/api/project_tasks/:id', ProjectTasks.findOne);
    app.put('/api/project_tasks/:id', ProjectTasks.update);
    app.delete('/api/project_tasks/:id', ProjectTasks.delete);

    app.get('/', (req, res) => res.send('Hello world'));
}

module.exports = useRoutes;
