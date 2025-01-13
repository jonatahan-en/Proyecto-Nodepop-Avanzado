#!/usr/bin/env node

import 'dotenv/config';
 // Alternative node : node --require dotenv/config server.js
// Alternativa node 22: node --env-file .env server.js
/**
 * Main start
 */

import app from './app.js'
import debugLib from 'debug'
import http from 'node:http'
const debug = debugLib('nodepop_fundamentos:server')

// Get port from environment and store in Express.
var port = Number(process.env.PORT || '3000')

// Create HTTP server.
var server = http.createServer(app)

// Listen on provided port, on all network interfaces.
server.on('error', err => console.error(err))
server.on('listening', () => debug(`Listening on port ${server.address().port}`))
server.listen(port)
