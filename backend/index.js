import express from 'express';
import pkg from 'pg';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';

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
app.use(bodyParser.json());
app.use(cors({ 
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
 }));

app.get('/users', async (req, res) => {
    const result = await pool.query('SELECT id_user, user_name, name, surname, email FROM users');
    res.json(result.rows);
    console.log(result);
});

app.get('/users/:id_user', async(req, res) => {
    const { id_user } = req.params;
    const result = await pool.query('SELECT id_user, user_name, name, surname, email FROM users WHERE id_user = $1', [id_user]);
    res.json(result.rows);    
});

app.get('/tweets', async (req, res) => {
    const result = await pool.query('SELECT * FROM tweets');
    res.json(result.rows);
    console.log(result);
});

app.get('/tweets/:id_tweet', async(req, res) => {
    const { id_tweet } = req.params;
    const result = await pool.query('SELECT * FROM tweets WHERE id_tweet = $1', [id_tweet]);
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

app.post('/tweets/:id_tweet/comments', ensureToken, async (req, res) => {
    const tweetId = req.params.id_tweet;
    const user = req.user.id_user;
    const commentText = req.body.com_text;
    try{
        const tweetData = await pool.query('SELECT * FROM tweets WHERE id_tweet = $1', [tweetId]);
         if (tweetData.rows.length === 0) {
             return res.status(403).json({ error: 'El tweet no existe'});
        }
        const result = await pool.query('INSERT INTO comments (id_tweet, id_user, com_text) VALUES ($1, $2, $3) RETURNING *', [tweetId, user, commentText]);
        const comment = result.rows;
        res.status(200).json({ comment });
    } catch (error){
        console.log('Error al agregar el comentario', error);
        res.status(403).json({ error })
    }
    
});

app.post('/tweets/:id_tweet/likes', ensureToken, async (req, res) => {
    const tweetId = req.params.id_tweet;
    const user = req.user.id_user;
    try{
        const tweetData = await pool.query('SELECT * FROM tweets WHERE id_tweet = $1 AND id_user = $2', [tweetId, user]);
        if(tweetData.rows.length === 0) {
            return res.status(403).json({ error: 'El tweet no existe'});
        }

        const likeData = await pool.query('SELECT * FROM likes WHERE id_tweet = $1 AND id_user = $2', [tweetId, user]);
        if(likeData.rows.length > 0){
            return res.status(403).json({error: 'Ya le has dado like a este tweet'});
        }

        const result = await pool.query('INSERT INTO likes (id_tweet, id_user) VALUES ($1, $2) RETURNING *', [tweetId, user]);
        const newLike = result.rows;
        
        res.status(200).json({ like: newLike });
    } catch (error) {
        console.log('Error al dar like al tweet', error);
        res.status(403).json({error});
    }
});
 

app.post('/users', async (req, res) => {  
   try{
        const { user_name, name, surname, email, password } = req.body; 
        console.log(req.body);   
        if (!user_name || !name || !surname || !email || !password) return res.status(403).json({ error: 'Faltan datos'});
        const result = await pool.query('INSERT INTO users (user_name, name, surname, email, password) VALUES ($1, $2, $3, $4, $5)', [user_name, name, surname, email, password]);
        res.status(200).json({ user: result.rows });  
   } catch (error) {
        console.log('Error al crear el usuario', error);
        res.status(500).json({ error: 'Error del servidor'});
   } 
}); 


app.post('/tweets', ensureToken, async(req, res) => {
    const user = req.user.id_user;
    const tweet = req.body.tweet;
    console.log('me esta mostrando este usuario:', req.user.id_user);
    console.log('me esta mostrando este body:', req.body.tweet);

    try{
        const userData = await pool.query('SELECT user_name FROM users WHERE id_user = $1', [user]);
        if (userData.rows.length === 0){
         return res.status(403).json({ error: 'Usuario no encontrado' });
        }

        const result = await pool.query('INSERT INTO tweets (id_user, tweet) VALUES ($1, $2) RETURNING *', [user, tweet]);
        res.status(201).json({ tweet: result.rows[0] });
    } catch (error) {
        console.error('Error al crear el tweet:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    console.log(req.user);
});

app.delete('/tweets/:id_tweet', async (req, res) => {
    const id_tweet = req.params.id_tweet;
    try{
        const delQ = 'DELETE FROM tweets WHERE id_tweet = $1';
        const result = await pool.query(delQ, [id_tweet]);
        res.status(200).json({ message: 'El tweet se ha eliminado correctamente' });   
    } catch {
        res.status(403).json({ error: 'Error al eliminar el tweet' });
    }
    
});

app.delete('/tweets/:id_tweet/likes', ensureToken, async (req, res) => {
    const tweetId = req.params.id_tweet;
    const user = req.user.id_user;
    try{
        const likeData = await pool.query('SELECT * FROM likes WHERE id_tweet= $1 AND id_user =$2', [tweetId, user]);
        if(likeData.rows.length === 0) {
            return res.status(403).json({ error: 'No has dado like a este tweet'});
        }

        const result = await pool.query('DELETE FROM likes WHERE id_tweet =$1 AND id_user =$2', [tweetId, user]);
        res.status(200).json({message : 'Has quitado el like correctamente'});

    } catch (error) {
        console.log('Error al quitar el like al tweet', error);
        res.status(403).json({ error });
    }
});

app.put('/users/:id_u', async (req, res) => {
    const id_user = req.params.id_user;
    const update = req.body;
    const updateQ = 'UPDATE users SET email = $1, password = $2 WHERE id_user = $3';
    const result = await pool.query(updateQ, [update.email, update.password, id_u]);
    res.status(200).json({message: 'El usuario se ha modificado correctamente.'});
});

app.put('/tweets/:id_tweet', ensureToken, async (req, res) => {
    const tweetId = req.params.id_tweet;
    const newText = req.body.newText;
    const user = req.user.id_user;
    
    try{
        const tweetData = await pool.query('SELECT * FROM tweets WHERE id_tweet = $1 AND id_user = $2', [tweetId, user]);
        if(tweetData.rows.length === 0){
            return res.status(403).json({ error: 'No puedes modificar este tweet'});
        }
        const result = await pool.query('UPDATE tweets SET tweet = $1 WHERE id_tweet = $2 RETURNING *', [newText, tweetId]);
        const updateTweet = result.rows;
        res.status(200).json({ tweet: updateTweet});
        
    } catch (error){
        console.log('Error al modificar el tweet', error);
        res.status(403).json({error});
    }
});

app.put('/comments/:id_comment', ensureToken, async (req, res) => {
    const commentId = req.params.id_comment;
    const newText = req.body.newText;
    const user = req.user.id_user;
    try{
        const comData = await pool.query('SELECT * FROM comments WHERE id_comment =$1 AND id_user = $2', [commentId, user]);
        if(comData.rows.length === 0) {
            return res.status(403).json({ error: 'No puedes modificar el comentario'});
        }
        const result = await pool.query('UPDATE comments SET com_text =$1 WHERE id_comment = $2 RETURNING*', [newText, commentId]);
        const updateC = result.rows;
        res.status(200).json({ comment: updateC });
    } catch (error){
        console.log('Error al modificar el comentario');
        res.status(403).json({ error });
    }
});

app.delete('/users/:id_u', async (req, res) => {
    const id_user = req.params.id_user;
    try{
        const delQ = 'DELETE FROM users WHERE id_user = $1';
        const result = await pool.query(delQ, [id_user]);
        res.status(200).json({ message: 'El usuario se ha eliminado correctamente' });   
    } catch {
        res.status(403).json({ error: 'Error al eliminar el usuario' });
    }
    
});

app.post('/login', async (req, res) => {
    const {user_name, password} = req.body;
    
    if (!user_name || !password){
    	return res.status(403).json({ error: 'Credenciales incorrectas' });
    }
     const result = await pool.query('SELECT * FROM users WHERE user_name = $1 AND password = $2', [user_name, password]);
    
    if (result.rows.length === 1) {
     const user = {user_name};
     const token = jwt.sign({user}, 'my_secret_key');
     console.log('Token generado:', token);
     return res.status(200).json({ token: token });
    } 
    else {
        return res.status(403).json({ error: 'Credenciales incorrectas' });
     } 
});

async function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        try {
            const decoded = jwt.verify(bearerToken, 'my_secret_key');
            console.log(decoded);
            req.user = decoded.user; // Asumiendo que el usuario está almacenado en el token
            next();
        } catch (error) {
            res.sendStatus(403);
            console.log(error);
        }
    } else {
        res.sendStatus(403);
    }
}
app.get('/protected', ensureToken, async (req, res) => {
    res.json({
        text: 'this is protected',
        user: req.user
    });
});


const PORT = 3000;

app.listen(
    PORT, 
    () => console.log(`I'ts alive on http://localhost:${PORT}`)
)