const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const useRoutes = require("./routes/routes");
const app = express();
const port = 3000;


app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

useRoutes(app)

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
