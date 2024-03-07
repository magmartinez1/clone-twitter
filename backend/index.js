import express from 'express';
import pkg from 'pg';
import jwt from 'jsonwebtoken';

const { Pool, Client } = pkg;
const app = express();

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
/*
app.post('/users/', async (req, res) => {  
    const { user_name, name, surname, email, password } = req.body;    
    if (!user_name || !name || !surname || !email || !password) return res.status(403).json({ error: 'Faltan datos'});
    const result = await pool.query('INSERT INTO users (user_name, name, surname, email, password) VALUES ($1, $2, $3, $4)', [user_name, name, surname, email, password]);
    res.status(200).json({ user: result.rows });    
}); 
*/

app.put('/users/:id_u', async (req, res) => {
    const id_u = req.params.id_u;
    const update = req.body;
    const updateQ = 'UPDATE users SET email = $1, password = $2 WHERE id_u = $3';
    const result = await pool.query(updateQ, [update.email, update.password, id_u]);
    res.status(200).json({message: 'El usuario se ha modificado correctamente.'});
});

app.delete('/users/:id_u', async (req, res) => {
    const id_u = req.params.id_u;
    try{
        const delQ = 'DELETE FROM users WHERE id_u = $1';
        const result = await pool.query(delQ, [id_u]);
        res.status(200).json({ message: 'El usuario se ha eliminado correctamente' });   
    } catch {
        res.status(403).json({ error: 'Error al eliminar el usuario' });
    }
    
});

app.post('/users', async (req, res) => {
    const {user_name, password} = req.body;
    
    if (!user_name || !password){
    	return res.status(403).json({ error: 'Credenciales incorrectas' });
    }
    const query = 'SELECT * FROM users WHERE user_name = $1 AND password = $2';
    const result = await pool.query(query, [user_name, password]);
    
    if (result.rows.length === 1) {
    const user = {user_name};
    const token = jwt.sign({user}, 'my_secret_key');
     return res.status(200).json({ token: token });
    } else {
        return res.status(403).json({ error: 'Credenciales incorrectas' });
      } 
});

app.get('/protected', ensureToken, async (req, res) => {
    jwt.verify(req.token, 'my_secret_key', function(err, data) {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'this is protected',
                data: data
            });
        }
    });
});

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

const PORT = 3000;

app.listen(
    PORT, 
    () => console.log(`I'ts alive on http://localhost:${PORT}`)
)