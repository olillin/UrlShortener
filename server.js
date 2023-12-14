const fs = require('fs')

require('dotenv/config')
const CERT_PATH = process.env.CERT_PATH || 'cert.pem'
const KEY_PATH = process.env.KEY_PATH || 'key.pem'


const app = require('./app.js')

if (fs.existsSync(CERT_PATH) && fs.existsSync(KEY_PATH)) {
    // Host with HTTPS
    const https = require('https')
    const PORT = process.env.PORT || 443
    https.createServer({
        cert: fs.readFileSync(CERT_PATH),
        key: fs.readFileSync(KEY_PATH),
    }, app).listen(PORT, () => {
        console.log(`Listening with HTTPS on port ${PORT}`)
    })
} else {
    // Host with HTTP
    const http = require('http')
    const PORT = process.env.PORT || 80
    http.createServer(app).listen(PORT, () => {
        console.log(`Listening with HTTP on port ${PORT}`)
    })
}
