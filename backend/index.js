import { Client } from 'pg'

const obtenerUsuarios = async () => {
    const client = new Client()
    await client.connect()
 
    const res = await client.query('SELECT* FROM users', ['Hello world!'])
    const result = res.rows[0].message;
    await client.end();

    return result;
}

obtenerUsuarios().then(result => {
    console.log(result);
});