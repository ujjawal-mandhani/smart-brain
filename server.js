const express=require('express');
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');


const db=knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '',
		database: 'smart-brain'
	}
});
const app=express();
app.use(bodyparser.json());
app.use(cors());
app.get('/',(req,res)=>{
	res.send(db.users);
});
/*app.get('/profile',(req,res)=>{
	res.send("getting profile");
});
app.post('/profile',(req,res)=>{
	console.log(req.body);
	res.send("success");
});*/


app.post('/signin',(req,res)=>{
	signin.handleSignin(req,res,db,bcrypt)
})

app.post('/register',(req,res)=>{
	register.handleRegister(req,res,db,bcrypt);
})

/*
	db('users').returning('*').insert({
		email: email,
		name: name,
		joined: new Date()
	}).then(user=>{
		res.json(user[0]);
	}).catch(err=>res.status(400).json('unable to connect'))*/

app.get('/profile/:id',(req,res)=>{
	profile.handleProfileGet(req,res,db)
})

app.put('/image',(req,res)=>{
	image.handleImage(req,res,db)
})

app.post('/imageurl',(req,res)=>{
	image.handleApiCall(req,res)
})

app.listen(3000,()=>{
	console.log("OK");
})