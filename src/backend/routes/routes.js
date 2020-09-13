const useRoutes = (app) => {
    const { InternalUsers } = require("../controllers/InternalUserController");
    console.log(InternalUsers);
    app.post('/api/internal_users', InternalUsers.create);
    app.get('/api/internal_users', InternalUsers.findAll);
    app.get('/api/internal_users/:id', InternalUsers.findOne);
    app.put('/api/internal_users/:id', InternalUsers.update);
    app.delete('/api/internal_users/:id', InternalUsers.delete);
}

module.exports = useRoutes;
