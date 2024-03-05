import express from 'express';
import pkg from 'pg';

const { Pool, Client } = pkg;
const app = express();

const jwt = require('jsonwebtoken');

const keys = require('./settings/keys');

app.set('key', keys.key);
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'midb',
  password: 'mi_contra',
  port: 5432,
});

app.use(express.json());

app.get('/users', async (req, res) => {
    const result = await pool.query('SELECT id_u, user_name, name, surname, email FROM users');
    res.json(result.rows);
    console.log(result);
});

app.get('/users/:id_u', async(req, res) => {
    const { id_u } = req.params;
    const result = await pool.query('SELECT id_1, user_name, name, surname, email FROM users WHERE id_u = $1', [id_u]);
    res.json(result.rows);    
});

app.get('/tweet', async (req, res) => {
    const result = await pool.query('SELECT * FROM tweet');
    res.json(result.rows);
    console.log(result);
});

app.get('/tweet/:id_tweet', async(req, res) => {
    const { id_tweet } = req.params;
    const result = await pool.query('SELECT * FROM tweet WHERE id_tweet = $1', [id_tweet]);
    res.json(result.rows);    
});

app.get('/likes', async (req, res) => {
    const result = await pool.query('SELECT * FROM likes');
    res.json(result.rows);
    console.log(result);
});

app.get('/likes/:id_like', async(req, res) => {
    const { id_like } = req.params;
    const result = await pool.query('SELECT * FROM likes WHERE id_like = $1', [id_like]);
    res.json(result.rows);    
});

app.get('/comments', async (req, res) => {
    const result = await pool.query('SELECT * FROM comments');
    res.json(result.rows);
    console.log(result);
});

app.get('/comments/:id_comment', async(req, res) => {
    const { id_comment } = req.params;
    const result = await pool.query('SELECT * FROM comments WHERE id_comment = $1', [id_comment]);
    res.json(result.rows);    
});

app.post('/users/', async (req, res) => {  
    const { user_name, name, surname, email, password } = req.body;    
    if (!user_name || !name || !surname || !email || !password) return res.status(403).json({ error: 'Faltan datos'});
    const result = await pool.query('INSERT INTO users (user_name, name, surname, email) VALUES ($1, $2, $3, $4)', [user_name, name, surname, email, password]);
    res.status(200).json({ user: result.rows });    
}); 

/*app.put('/users/id_u', async (req, res) => {
    const id_u = req.params.id_u;
    const update = req.body;


})*/



const PORT = 3000;

app.listen(
    PORT, 
    () => console.log(`I'ts alive on http://localhost:${PORT}`)
)