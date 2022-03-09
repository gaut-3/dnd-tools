
const dotenv = require('dotenv')
const express = require('express')
const server = http.createServer(app)
const app = express()


app.use(express.static('frontend-new/build'))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const port = process.env.PORT || 8000
server.listen(port, () => {
    console.log(`Server started at port: ${port}`)
})
