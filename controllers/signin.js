const handleSignin=(req,res,db,bcrypt)=>{
		const { email, password } = req.body;
		if(!email || !password)
		{
			return res.status(400).json('incorrect form submission');
		}
		db.select('email','hash').from('login').
		Where('email','=',email).
		then(data=>{
		const isvalid= bcrypt.compareSync(password,data[0].hash);
		if(isvalid){
			return db.select('*').from('users').Where('email','=',email)
			.then(user=>{
				res.json(user[0])
			}).catch(err=>res.status(400).json('unable to get user'))
		}else{
			res.status(400).json('Wrong credentials')
		}
	}).catch(err=>res.status(400).json('Wrong credentials'))
}

module.exports={
	handleSignin: handleSignin
}