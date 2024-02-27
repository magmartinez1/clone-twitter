import pkg from 'pg';
const { Pool, Client } = pkg;
 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'midb',
  password: 'mi_contra',
  port: 5432,
})
 
console.log(await pool.query('SELECT* FROM users'))
 
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'midb',
  password: 'mi_contra',
  port: 5432,
})
 
await client.connect()
 
console.log(await client.query('SELECT* FROM users'))
 
await client.end()