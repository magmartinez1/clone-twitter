# clone-twitter
### Descripción
El clon de la red social Twitter está diseñada para replicar la funcionalidad básica de la plataforma. Crear perfiles, publicar "tweets", entre otras funciones.
### Entidades:
#### \- Usuario:
- **Descripción:**  Representa a todos los usuarios de la plataforma.
- **Atributos:** 
1. id_usuario: identificador del usuario
2. nombre_usuario: nombre único de usuario
3. correo_electronico: correo electrónico del usuario
4. foto: imagen de perfil del usuario
5. fecha_registro: fecha en la que se registró el registro

#### \- Tweet:
- **Descripción:** Representa todos los mensajes publicados por los usuarios.
- **Atributos:**
1. id_tweet: identificador de la publicación.
2. id_usuario: indentificador del usuario (clave foránea de *usuario*)
3. texto: texto dentro de la publicación (máx 140 carácteres).

### Relaciones:
- **Publicación: Usuario - Tweet**
  Un usuario puede aplicar varios tweets.
  Cada tweet es publicado por un solo usuario.
- **Like: Usuario - Tweet**
  Un usuario puede dar *like* a varios tweets.
  Cada *like* se asocia a un solo usuario.
- **Respuesta: Usuario tweet**
  Un usuario puede dar varias respuestas a varios tweets.
  Cada respuesta está asociada a un solo usuario.



