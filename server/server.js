const express = require('express')
const app = express();

const cors = require('cors')
const morgan = require('morgan')
const {connect} = require('./database/conn.js')
const router = require('./router/routes.js')
const taskRoutes = require('./router/taskRoutes.js');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));  //middleware used to log all the HTTP requests and error
app.disable('x-power-by');  // so that less hackers can know our stack

const port = 8080;

// HTTP GET REQUEST
app.get('/', (req, res) => {
    res.status(201).json("Home GET request");
})

// api routes
app.use('/api', router);
app.use('/api', taskRoutes);

// start server only when there is a valid connection

connect().then(() => {

    try {
        app.listen(port, () => {
            console.log(`Server is connected to http://127.0.0.1:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server!")
    }

}).catch(error => {
    console.log("Invalid Database connection...", error)
})


