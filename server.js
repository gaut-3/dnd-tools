const dotenv = require('dotenv')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)

app.use(cors())

if (process.env.NODE_ENV === "production") {
    app.use(express.static('frontend-new/build'))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 8000
server.listen(port, () => {
    console.log(`Server started at port: ${port}`)
})
