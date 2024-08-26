const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = {
	players: [],
};

const dbPosts = {
	posts: [],
};

app.get('/users', (request, response) => {
	response.send(db);
});

app.post('/user', (request, response) => {
	const { username, password, email } = request.body;

	// Revisa si el usuario ya existe
	const userExists = db.players.some((player) => player.username === username || player.email === email);

	if (userExists) {
		return response.status(409).send({ message: 'Username or Email already exists' });
	}

	// Agrega el nuevo usuario a la base de datos
	const newUser = { username, password, email };
	db.players.push(newUser);
	response.status(201).send(newUser); // Devuelve 201 Created para indicar que el usuario se ha creado
});

// endpoint para el login
app.post('/login', (request, response) => {
	const { username, password } = request.body;

	// encontrar el usuario en la db
	const user = db.players.find((player) => player.username === username && player.password === password);

	if (user) {
		// si encuentra el user retorna con exito
		response.status(200).send({ message: 'Login successful' });
	} else {
		// si no retorna un error
		response.status(401).send({ message: 'Invalid username or password' });
	}
});

app.get('/posts', (request, response) => {
	response.send(dbPosts);
});

app.post('/post', (request, response) => {
	const { body } = request;
	dbPosts.posts.push(body);
	response.status(201).send(body);
});

app.listen(5050, () => {
	console.log(`Server is running on http://localhost:${5050}`);
});
