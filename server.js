const db = require("./app/models");
const Role = db.role;
const dotenv = require('dotenv')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const http = require('http')
const mongoose = require('mongoose')
const authJwt = require("./app/middlewares/authJwt");
const {deleteDnDDates} = require("./app/controllers/date.controller");
const {getAllDates} = require("./app/controllers/date.controller");
const {addDnDDates} = require("./app/controllers/date.controller");
const {addDate} = require("./app/controllers/date.controller");
const {getDates} = require("./app/controllers/date.controller");
const server = http.createServer(app)

dotenv.config({path: "./config.env"})

const DB = process.env.DB.replace(
    'password',
    process.env.DB_PASS
)

mongoose.connect(DB)
    .then(() => {
        console.log("The database and collections are connected...");
        initial();
    })

app.use(cookieParser())
app.use(express.json())

app.use(cors())

app.get('/api/dnddates/:id', getDates);
app.put('/api/dnddates/:id', [authJwt.verifyToken, authJwt.isAdmin], addDate);
app.post('/api/dnddates', [authJwt.verifyToken, authJwt.isAdmin], addDnDDates);
app.delete('/api/dnddates/:id', [authJwt.verifyToken, authJwt.isAdmin], addDate);

app.get('/api/dnddates/all/:id', [authJwt.verifyToken, authJwt.isAdmin], getAllDates);
app.delete('/api/dnddates/all/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteDnDDates);

app.delete('/logout', [authJwt.verifyToken, authJwt.isAdmin], addDate);

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

if (process.env.NODE_ENV === "production") {
    app.use(express.static('frontend-new/build'))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend-new', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 8000
server.listen(port, () => {
    console.log(`Server started at port: ${port}`)
})

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        console.log(count)
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}