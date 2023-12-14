const express = require('express')
const fs = require('fs')
const crypto = require('crypto')

require('dotenv/config')
const SECRET = process.env.SECRET || ''
const IDENTIFIER_LENGTH = parseInt(process.env.IDENTIFIER_LENGTH) || 6
const encryptionIV = hash(process.env.ENCRYPTION_IV || '').substring(0, 16)

const app = express()
module.exports = app

const urls = {}

app.use('/', express.static('./public/'))
app.use(express.urlencoded({extended: true}))

app.post('/api/signup/', (req, res) => {
    const {email, password} = req.body
})

app.post('/api/create-url', (req, res) => {
    const {url} = req.body

    res.end(hash(url))
})

function hash(data) {
    return crypto.createHash('sha512').update(data + SECRET).digest('base64')
}

function encrypt(data, key) {
    const hashedKey = hashKey(key)
    const cypher = crypto.createCipheriv('aes-256-cbc', hashedKey, encryptionIV)
    return cypher.update(data, 'utf8', 'base64') + cypher.final('base64')
}

function decrypt(data, key) {
    const hashedKey = hashKey(key)
    const decypher = crypto.createDecipheriv('aes-256-cbc', hashedKey, encryptionIV)
    return decypher.update(data, 'base64', 'utf8') + decypher.final('utf8')
}

function hashKey(key) {
    return hash(key).substring(0, 32)
}

function generateIdentifer() {
    const randomId = function() {
        return crypto.randomBytes(IDENTIFIER_LENGTH)
            .toString('base64')
            .substring(0, IDENTIFIER_LENGTH)
            .replace('+', '-')
            .replace('/', '_')
    }

    const maxAttempts = 500
    for (let i = 0; i < maxAttempts; i++) {
        const id = randomId()
        if (!getURL(id)) {
            // URL is unused
            return id
        }
    }
    throw new Error(`Failed to generate identifier after ${maxAttempts} attempts`)
}

function getURL(id) {
    const hashedId = hash(id)
    const encryptedURL = urls[hashedId]
    if (!encryptedURL) return undefined
    const URL = decrypt(encryptedURL, id)
    return URL
}

function saveURL(id, url) {
    const entry = encryptURL(id, url)
    const [key, value] = entry
    urls[key] = value
}

function encryptURL(id, url) {
    const hashedId = hash(id)
    const encryptedURL = encrypt(url, id)
    return [hashedId, encryptedURL]
}
