const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'weng630312',
    database : "'smart-brain'"
  }
});

// console.log(db.select('*').from('users'));
// db.select('*').from('users').then(data => {
// 	console.log(data);
// });



const app = express();

app.use(express.json());
// const database = {
// 	users: [
// 		{
// 			id: '123',
// 			name: 'John',
// 			email: 'john@gmail.com',
// 			password: 'cookies',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: '124',
// 			name: 'Sally',
// 			email: 'sally@gmail.com',
// 			password: 'bananas',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 	],
// 	login: [
// 		{
// 			id: '987',
// 			hash: '',
// 			email: 'john@gmail.com'
// 		}
// 	]
// }

app.use(cors());

app.get('/', (req, res) => {
	res.send('success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

// app.post('/signin', (req, res) => {
// 	db.select('email', 'hash').from('login')
// 		.where('email', '=', req.body.email)
// 		.then(data => {
// 			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
// 			if (isValid) {
// 				return db.select('*').from('users')
// 					.where('email', '=', req.body.email)
// 					.then(user => {
// 						res.json(user[0])
// 					})
// 					.catch(err => res.status(400).json('unable to get user'))
// 			} else {
// 				res.stat(400).json('wrong credentials')
// 			}
// 		})
		// .catch(err => res.status(400).json('wrong credentials'))
	// bcrypt.compare("apples", '$2a$10$J349FCMqxax18m0C1ZwQzeWekR5HfHrMyFY5xCW97kOM99iXXi.fO', function(err, res) {
 //    	console.log('first guess', res)
	// });
	// bcrypt.compare("veggies", '$2a$10$J349FCMqxax18m0C1ZwQzeWekR5HfHrMyFY5xCW97kOM99iXXi.fO', function(err, res) {
 //    	console.log('second guess', res)
	// });
	// if (req.body.email === database.users[0].email &&
	// 	req.body.password === database.users[0].password) {
	// res.json(database.users[0]);
	// } else {
	// 	res.status(400).json('errror logging in');
	// }
// } )

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// app.post('/register', (req, res) => {
// 	const { email, name, password } = req.body;
// 	const hash = bcrypt.hashSync(password);
// 		db.transaction(trx => {
// 			trx.insert({
// 				hash: hash,
// 				email: email
// 			})
// 			.into('login')
// 			.returning('email')
// 			.then(loginEmail => {
// 				return trx('users')
// 				.returning('*')
// 				.insert({
// 					email: loginEmail[0].email,
// 					name: name,
// 					joined: new Date()
// 				})
// 				.then(user => {
// 					res.json(user[0]);
// 				})
// 			})
// 			.then(trx.commit)
// 			.catch(trx.rollback)
// 		})
		
// 		.catch(err => res.status(400).json('unable to register'))
// })

	// bcrypt.hash(password, null, null, function(err, hash) {
 //    	console.log(hash);
	// });
	// database.users.push({
	// 	id: '125',
	// 	name: name,
		
	// 	password: password,
	// 	entries: 0,
	// 	joined: new Date()
	// })
// 	res.json(database.users[database.users.length-1]);
// })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

// app.get('/profile/:id', (req, res) => {
// 	const { id } = req.params; 
// 	db.select('*').from('users').where({id})
// 		.then(user => {
// 			if (user.length) {
// 				res.json(user[0])
// 			} else {
// 			res.status(400).json('Not found')
// 			}
// 		})
// 		.catch(err => res.status(400).json('error getting user'))
	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		return res.json(user);
	// 	} 
	// })
	// if (!found) {
	// 	res.status(400).json('not found');
	// }
// })

app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

// app.put('/image', (req, res) => {
// 	const { id } = req.body;
// 	db('users').where('id', '=', id)
//   	.increment('entries', 1)
//   	.returning('entries')
//   	.then(entries => {
//   		res.json(entries[0].entries);
//   	})
//   	.catch(err => res.status(400).json('unable to get entries'))
//   }) 
	// let found = false;
	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		user.entries++;
	// 		return res.json(user.entries);
	// 	}
	// })
	// if (!found) {
	// 	res.status(400).json('not found');
	// }	 
// })



// Load hash from your password DB.


// app.listen(3000, () => {
// 	console.log('app is running on port 3000')
// })

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT (update) --> user


*/