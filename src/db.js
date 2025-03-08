import {createPool} from 'mysql2/promise'
import { DB_HOST, DB_PASS, DB_NAME,DB_PORT, DB_USER } from '../config.js'

console.log( DB_USER);
console.log( DB_HOST);
console.log( DB_PASS);
console.log( DB_NAME);
console.log( DB_PORT);

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_NAME
})